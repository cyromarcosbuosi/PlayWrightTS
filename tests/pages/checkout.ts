import { Locator, Page } from "@playwright/test";

export class Checkout {
    readonly page: Page;
    readonly firstNameField: Locator;
    readonly lastNameField: Locator;
    readonly postalCodeField: Locator;
    readonly continueBtn: Locator;
    readonly finishCheckoutBtn: Locator;
    readonly checkoutCompleteImg: Locator;
    readonly removeBackPackBtn: Locator;
    readonly removedCartItem: Locator;

    constructor(page) {
        this.page = page;
        this.firstNameField = page.locator('[data-test="firstName"]');
        this.lastNameField = page.locator('[data-test="lastName"]');
        this.postalCodeField = page.locator('[data-test="postalCode"]');
        this.continueBtn = page.locator('[data-test="continue"]');
        this.finishCheckoutBtn = page.locator('[data-test="finish"]');
        this.checkoutCompleteImg = page.getByRole('img', { name: 'Pony Express' });
        this.removeBackPackBtn = page.locator('[data-test="remove-sauce-labs-backpack"]')
        this.removedCartItem = page.locator('.removed_cart_item');
        
    }

    async fillCheckoutFields(firstName, lastName, postalCode) {
        await this.firstNameField.fill(firstName);
        await this.lastNameField.fill(lastName);
        await this.postalCodeField.fill(postalCode);
    }


}