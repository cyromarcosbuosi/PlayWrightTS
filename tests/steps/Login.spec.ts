import { test, expect } from "@playwright/test"
import { Utils } from "../../utils/main";
import { Common } from '../pages/common';
import { LoginPage } from '../pages/Login';

let common;
let login;
let user;
const util = new Utils

test.describe('Saucelabs testing', () => {

    test.beforeEach(async ({ page }) => {
        common = new Common(page);
        login = new LoginPage(page);
        user = await util.importFile('users');
        await common.loadToPage('')
    })

    test.only('Log in with valid user', async ({ page }) => {
        await login.loginValidUser(user.usernames['standard_user'], user.password['rightPassword']);
        await expect(login.cartBtn).toBeVisible();
    })


})