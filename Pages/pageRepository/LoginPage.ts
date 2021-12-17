import { LoginPageObjects } from "../pageObjects/LoginPageObjects";
import { Page } from "@playwright/test";

export class LoginPage {

  readonly page: Page;


  constructor(page: Page) {
    this.page = page;

  }

  loginPageObjects = new LoginPageObjects();

  async NavigateToUrl(homepageurl: string): Promise<void> {
    await this.page.goto(homepageurl);
  }

  async loginToApplication(username: string, password: string, produsername: string): Promise<void> {

    await this.page.fill(this.loginPageObjects.USERNAME_TEXTBOX_ID, username);

    await this.page.click(this.loginPageObjects.NEXT_BUTTON_ID);

    await this.page.waitForNavigation({ timeout: 5000 });

    await this.page.waitForTimeout(5000);

    await this.page.fill(this.loginPageObjects.PASSWORD_TEXTBOX_ID, password);

    await this.page.click(this.loginPageObjects.SIGNIN_BUTTON_ID);

    await this.page.waitForNavigation({ timeout: 10000 });

    //await this.page.waitForTimeout(20000);

    const [popup] = await Promise.all([
      this.page.waitForEvent('popup'),
      this.page.click(this.loginPageObjects.FIRSTUP_SIGNIN_LINK),  // Opens popup
    ]);
    await popup.waitForLoadState('load');

    await this.page.waitForTimeout(5000);

    console.log(await popup.title());

    await this.page.waitForTimeout(5000);

    await popup.waitForSelector(this.loginPageObjects.USE_ANOTHER_ACCOUNT_LINK);

    await popup.click(this.loginPageObjects.USE_ANOTHER_ACCOUNT_LINK);

    await popup.waitForTimeout(5000);

    await popup.waitForSelector(this.loginPageObjects.USERNAME_TEXTBOX_ID);

    await popup.fill(this.loginPageObjects.USERNAME_TEXTBOX_ID, produsername);

    await popup.waitForSelector(this.loginPageObjects.FIRSTUP_NEXT_BUTTON_ID);

    await popup.click(this.loginPageObjects.FIRSTUP_NEXT_BUTTON_ID);

    await this.page.waitForTimeout(10000);

    await this.page.bringToFront()

    console.log(this.page.url());

    console.log(await this.page.title());

    await this.page.waitForTimeout(5000);

    //await this.page.frameLocator("//iframe[@class='hero-card']").locator("[aria-label='Go to Page 4']").click();
  }

}