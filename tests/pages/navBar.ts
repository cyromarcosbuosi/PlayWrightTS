import { Locator, Page } from "@playwright/test";
export class NavBar {
  readonly page: Page;
  readonly menuBtn: Locator;
  readonly allItemsLink: Locator;
  readonly aboutLink: Locator;
  readonly logoutLink: Locator;

  constructor(page) {
    this.page = page;
    this.menuBtn = page.locator("[data-test='open-menu']");
    this.allItemsLink = page.locator("[data-test='inventory-sidebar-link']");
    this.aboutLink = page.locator("[data-test='about-sidebar-link']");
    this.logoutLink = page.locator("[data-test='logout-sidebar-link']");
  }

  async openMenu() {
    await this.menuBtn.click();
  }

  async navigateToAllItems() {
    await this.openMenu();
    await this.allItemsLink.click();
  }

  async navigateToAbout() {
    await this.openMenu();
    await this.aboutLink.click();
  }

  async logout() {
    await this.openMenu();
    await this.logoutLink.click();
  }
}
