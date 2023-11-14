import { test, expect } from "@playwright/test"
import { beforeEach, describe } from "node:test";
import { Utils } from "../../utils/main";
import { Common } from '../pages/common';
import { Ecom } from "../pages/ecom";
import { LoginPage } from '../pages/Login';

let common;
let login;
let user;
let ecom;
const util = new Utils

describe('ecommerce test cases', () => {

    test.beforeEach(async ({ page }) => {
        common = new Common(page);
        login = new LoginPage(page);
        ecom = new Ecom(page);
        user = await util.importFile('users');
        await common.loadToPage('')
    })

    test('add item to the basket', ({ }) => {
        login.inputSignCredentials(user.usernames.standard_user)

    })

}) 