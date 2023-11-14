import { Locator, Page, expect } from "@playwright/test";

export class Ecom {
    readonly page: Page; 
    readonly cartBtn: Locator;

    constructor(page){
        this.page = page;
        this.cartBtn = page.locator('#shopping_cart_container a');
    }
}