import { test, expect } from "@playwright/test";
import exp from "constants";
import { before, beforeEach, describe } from "node:test";
import { Utils } from "../../utils/main";
import { Cart } from "../pages/cart";
import { Checkout } from "../pages/checkout";
import { Common } from "../pages/common";
import { Ecom } from "../pages/ecom";
import { LoginPage } from "../pages/Login.ts";

let common;
let login;
let user;
let ecom;
const util = new Utils();
let cart;
let item;
let userCookies;
let checkout;

describe("ecommerce E2E test cases", () => {
  test.beforeEach(async ({ page }) => {
    common = new Common(page);
    ecom = new Ecom(page);
    item = await util.importFile("items");
    user = await util.importFile("users");
    checkout = new Checkout(page);
    cart = new Cart(page);
    login = new LoginPage(page);
    userCookies = await util.importFile("cookies");
    await page.context().addCookies([
      {
        name: userCookies.cookies.standard_user.name,
        value: userCookies.cookies.standard_user.value,
        domain: userCookies.cookies.standard_user.domain,
        path: "/",
        expires: Date.now() / 1000 + 10000,
      },
    ]);
    await common.loadToPage("/inventory.html");
  });

  test("adds item to basket and proceeds to checkout", async ({}) => {
    await ecom.addToCartBackpackBtn.click();
    await ecom.cartBtn.click();
    await cart.checkoutBtn.click();
    await checkout.fillCheckoutFields(
      user.firstName,
      user.lastName,
      user.postalCode
    );
    await checkout.continueBtn.click();
    await checkout.finishCheckoutBtn.click();
    await expect(checkout.checkoutCompleteImg).toBeVisible();
  });

  test("removes item from the basket", async ({ page }) => {
    await ecom.addToCartBackpackBtn.click();
    await ecom.cartBtn.click();
    await checkout.removeBackPackBtn.click();
    await expect(checkout.removedCartItem).toBeTruthy();
  });
});

test.describe("broken users test set, these tests are supposed to fail", () => {
  test.beforeEach(async ({ page }) => {
    common = new Common(page);
    ecom = new Ecom(page);
    item = await util.importFile("items");
    user = await util.importFile("users");
    userCookies = await util.importFile("cookies");
    await page.context().addCookies([
      {
        name: userCookies.cookies.problem_user.name,
        value: userCookies.cookies.problem_user.value,
        domain: userCookies.cookies.problem_user.domain,
        path: "/",
        expires: Date.now() / 1000 + 10000,
      },
    ]);
    await common.loadToPage("/inventory.html");
  });

  //Scenario where user logs in with problem user and checks image of the backpack
  test("problem user checks backpack image", async ({ page }) => {
    await expect(ecom.productImage).toBeVisible();
    await expect(ecom.productImage).toHaveAttribute(
      "src",
      "/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg"
    );
  });
});
