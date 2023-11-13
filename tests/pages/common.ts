import { Page, Locator, expect } from '@playwright/test';

export class Common {
    readonly page: Page;

    async loadToPage(path) {
       await this.page.goto(path)
    }

    constructor(page: Page) {
        this.page = page
    }
}