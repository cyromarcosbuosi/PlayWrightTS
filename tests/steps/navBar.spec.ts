import { test, expect } from "@playwright/test";
import exp from "constants";
import { before, beforeEach, describe } from "node:test";
import { Utils } from "../../utils/main";
import { Common } from "../pages/common";
import { Ecom } from "../pages/ecom";
import { LoginPage } from "../pages/Login.ts";
import { NavBar } from "../pages/navBar.ts";

let common;
let navBar;
let login;
let user;
let ecom;
const util = new Utils();

//Test suite for the navigation bar functionality with cookies
test.describe("Saucelabs navigation bar testing", () => {
  test.beforeEach(async ({ page }) => {
    common = new Common(page);
    ecom = new Ecom(page);
    user = await util.importFile("users");
    login = new LoginPage(page);
    navBar = new NavBar(page);
    await common.loadToPage("/index.html");
    const userCookies = await util.importFile("cookies");
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

  test("Check if the navigation bar is visible", async ({ page }) => {
    await expect(navBar.menuBtn).toBeVisible();
  });

  // Test to click the navBar button, click on all items and check if the URL is correct
  test("Click on the navBar button and check if the URL is correct", async ({
    page,
  }) => {
    await navBar.menuBtn.click();
    await navBar.allItemsLink.click();
    await expect(page).toHaveURL(/.*\/inventory\.html$/);
  });

  // Test to click the navBar button, click on about and check if the URL is correct
  test("Click on the navBar button and check if  the about URL is correct", async ({
    page,
  }) => {
    await navBar.menuBtn.click();
    await navBar.aboutLink.click();
    await expect(page).toHaveURL("https://saucelabs.com/");
  });

  // Test to click the navBar button, click on logout and check if the URL is correct
  test("Click on the navBar button and check if the logout URL is correct", async ({
    page,
  }) => {
    await navBar.menuBtn.click();
    await navBar.logoutLink.click();
    await expect(page).toHaveURL("/");
    await expect(login.submitBtn).toBeVisible();
  });
});
