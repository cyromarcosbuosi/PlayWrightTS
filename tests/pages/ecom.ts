import { Locator, Page, expect } from "@playwright/test";

export class Ecom {
    readonly page: Page; 
    readonly cartBtn: Locator;
    readonly addToCartBackpackBtn: Locator;
    readonly removeFromCartBackpackBtn: Locator;
    readonly addToCartBikeLightBtn: Locator;
    readonly removeFromCartBikeLightBtn: Locator;


    constructor(page){
        this.page = page;
        this.cartBtn = page.locator('#shopping_cart_container a');
        this.addToCartBackpackBtn = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        this.removeFromCartBackpackBtn = page.locator('[data-test="remove-sauce-labs-backpack"]');
        this.addToCartBikeLightBtn = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
        this.removeFromCartBikeLightBtn = page.locator('[data-test="remove-to-cart-sauce-labs-bike-light"]');
    }
}