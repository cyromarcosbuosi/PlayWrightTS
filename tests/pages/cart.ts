import { Locator, Page } from "@playwright/test";

export class Cart {
    readonly page: Page;
    readonly baskteItem: Locator;
    readonly checkoutBtn: Locator; 

    constructor(page){
        this.page = page;
        this.checkoutBtn = page.locator('[data-test="checkout"]');
        this.baskteItem = page.getByRole('link', { name: 'Sauce Labs Backpack' });
    }
}

