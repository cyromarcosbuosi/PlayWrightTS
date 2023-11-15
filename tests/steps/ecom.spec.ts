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
        await common.loadToPage('')
    })

    test.only('adds item to basket and proceeds to checkout', async ({ }) => {
        await login.inputSignCredentials(user.usernames.standard_user, user.password.rightPassword);
        await ecom.addToCartBackpackBtn.click();
        await ecom.cartBtn.click();
        await cart.checkoutBtn.click();
        await checkout.fillCheckoutFields(user.firstName, user.lastName, user.postalCode);
        await checkout.continueBtn.click();
        await checkout.finishCheckoutBtn.click();
        await expect(checkout.checkoutCompleteImg).toBeVisible();
    })

}) 