import { Locator, Page, expect } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly userName: Locator;
    readonly password: Locator;
    readonly submitBtn: Locator;

    constructor(page) {
        this.page = page
        this.userName = page.locator('[data-test="username"]');
        this.password = page.locator('[data-test="password"]');
        this.submitBtn = page.locator('[data-test="login-button"]');
    }

    async loginValidUser(user, password){
        await this.userName.fill(user);
        await this.password.fill(password);
        await this.submitBtn.click();
    }
}