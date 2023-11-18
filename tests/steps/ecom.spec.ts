import { test, expect } from "@playwright/test"
import exp from "constants";
import { beforeEach, describe } from "node:test";
import { Utils } from "../../utils/main";
import { Cart } from "../pages/cart";
import { Checkout } from "../pages/checkout";
import { Common } from '../pages/common';
import { Ecom } from "../pages/ecom";
import { LoginPage } from '../pages/Login';

let common;
let login;
let user;
let ecom;
const util = new Utils
let cart;
let item;
let userCookies;
let checkout

describe('ecommerce E2E test cases', () => {

    test.beforeEach(async ({ page }) => {
        common = new Common(page);
        login = new LoginPage(page);
        ecom = new Ecom(page);
        cart = new Cart(page);
        checkout = new Checkout(page);
        item = await util.importFile('items')
        user = await util.importFile('users');
        userCookies = await util.importFile('cookies');
        await page.context().addCookies([{
            name: userCookies.cookies.name,
            value: userCookies.cookies.value,
            domain:userCookies.cookies.domain,
            path: '/',
            expires: Date.now() / 1000 + 10000
        }])
        await common.loadToPage('/inventory.html')
    })

    test('adds item to basket and proceeds to checkout', async ({ }) => {
        await ecom.addToCartBackpackBtn.click();
        await ecom.cartBtn.click();
        await cart.checkoutBtn.click();
        await checkout.fillCheckoutFields(user.firstName, user.lastName, user.postalCode);
        await checkout.continueBtn.click();
        await checkout.finishCheckoutBtn.click();
        await expect(checkout.checkoutCompleteImg).toBeVisible();
    })

    test.only('removes item from the basket', async ({ page }) => {
        await ecom.addToCartBackpackBtn.click();
        await ecom.cartBtn.click();
        await checkout.removeBackPackBtn.click();
        await expect(checkout.removedCartItem).toBeTruthy();
    })

}) 