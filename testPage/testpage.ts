import { Page } from "@playwright/test";

export class testpage {
  readonly page: Page;


  constructor(page: Page) {
    this.page = page;
  }

  async NavigateToUrl(url: string): Promise<void> {
    await this.page.goto(url);
  }
}