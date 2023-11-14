import { test, expect } from "@playwright/test"
import { Utils } from "../../utils/main";
import { Common } from '../pages/common';
import { Ecom } from "../pages/ecom";
import { LoginPage } from '../pages/Login';

let common;
let login;
let user;
let ecom;
const util = new Utils

test.describe('Saucelabs testing', () => {

    test.beforeEach(async ({ page }) => {
        common = new Common(page);
        login = new LoginPage(page);
        ecom = new Ecom(page);
        user = await util.importFile('users');
        await common.loadToPage('')
    })

    test.only('Log in with valid user', async ({ }) => {
        await login.inputSignCredentials(user.usernames.standard_user, user.password.rightPassword);
        await expect(ecom.cartBtn).toBeVisible();
    })

    test('Log in with wrong password', async ({ }) => {
        await login.inputSignCredentials(user.usernames.standard_user, user.password.wrongPassword);
        await expect(login.signInErrorMsg).toBeVisible();
    })

    test('Try to log in with locked out', async ({ }) => {
        await login.inputSignCredentials(user.usernames.standard_user, user.password.rightPassword);
        await expect(login.signInErrorMsg).toContainText('Epic sadface: Sorry, this user has been locked out.')
    })




})