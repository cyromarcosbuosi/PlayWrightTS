import { test, expect } from "@playwright/test";
import { Utils } from "../../utils/main";
import { Common } from "../pages/common";
import { Ecom } from "../pages/ecom";
import { LoginPage } from "../pages/Login.ts";

let common;
let login;
let user;
let ecom;
const util = new Utils();

test.describe("Saucelabs performance testing", () => {
  test.beforeEach(async ({ page }) => {
    common = new Common(page);
    login = new LoginPage(page);
    ecom = new Ecom(page);
    user = await util.importFile("users");
    await common.loadToPage("");
  });

  test("Measure performance of login with valid user", async ({ page }) => {
    const startTime = performance.now();
    await login.inputSignCredentials(
      user.usernames.standard_user,
      user.password.rightPassword
    );
    const endTime = performance.now();
    const duration = endTime - startTime;
    console.log(`Login with valid user took ${duration} milliseconds`);
    await expect(ecom.cartBtn).toBeVisible();
  });

  // login with performance_glitch_user and measure performance and expect time not to exceed 2000 milliseconds
  test.only("Measure performance of login with performance glitch user", async ({
    page,
  }) => {
    const startTime = performance.now();
    await login.inputSignCredentials(
      user.usernames.performance_glitch_user,
      user.password.rightPassword
    );
    const endTime = performance.now();
    const duration = endTime - startTime;
    console.log(
      `Login with performance glitch user took ${duration} milliseconds`
    );
    expect(duration).toBeLessThan(2000);
    await expect(ecom.cartBtn).toBeVisible();
  });
});
