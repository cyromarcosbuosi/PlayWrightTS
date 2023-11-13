import { Locator, Page, expect } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly userName: Locator;
    readonly password: Locator;
    readonly submitBtn: Locator;

    constructor(page) {
        this.page = page
        this.userName = page.Locator('#user-name');
        this.password = page.Locator('#password');
        this.submitBtn = page.Locator('.submit-button btn_action');
    }

    async loginValidUser(user, password){
        await this.userName.fill(user);
        await this.password.fill(password);
        await this.submitBtn.click();
    }
}