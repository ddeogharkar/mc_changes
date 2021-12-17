import { Page } from "@playwright/test";
import { HomePageObjects } from "../pageObjects/HomePageObjects";

export class HomePage {

  readonly page: Page;


  constructor(page: Page) {
    this.page = page;

  }

  homePageObjects = new HomePageObjects();

  async clickTopNewsDots(): Promise<void> {
    await this.page.frameLocator(this.homePageObjects.TOPNEWS_IFRAME).locator(this.homePageObjects.TOPNEWS_DOT).click();
  }

}