import { expect, Page } from "@playwright/test";
import { BillboardPageObjects } from "../pageObjects/BillboardPageObjects";
import testData from "../../Data/testData.json"
import { Utilities } from "../../Utils/Utilities";

export class BillboardPage {
  readonly page: Page;


  constructor(page: Page) {
    this.page = page;

  }

  billboardPageObjects = new BillboardPageObjects();

  async VerifyBillBoardWebPartIsVisible(): Promise<boolean> {
    await this.page.mouse.wheel(0, 1500);

    const Billboard = this.page.locator(this.billboardPageObjects.BILLBOARD_WEBPART);
    await Billboard.scrollIntoViewIfNeeded();
    return await Billboard.isVisible();
  }

  async VerifyTitleOfBillboardWebPart(): Promise<boolean> {
    const actualTitle = await this.page.locator(this.billboardPageObjects.BILLBOARD_TITLE).textContent();
    return actualTitle === testData.ExpectedBillboardTitle ? true : false;
  }

  async GetTotalDots(): Promise<number> {
    const dotNumber = await this.page.locator(this.billboardPageObjects.BILLBOARD_DOT_LIST).count();
    return dotNumber;
  }

  async ClickOnDots(i: number): Promise<void> {
    await this.page.locator(this.billboardPageObjects.BILLBOARD_DOTS).nth(i).click();
    this.page.waitForTimeout(2000);
  }

  async VerifyBillboardCards(): Promise<boolean[]> {

    let flag = [];

    for (let index = 0; index < await this.GetTotalDots(); index++) {

      await this.ClickOnDots(index);

      const element = await this.page.$(this.billboardPageObjects.BILLBOARD_CARD_XPATH);

      console.log(await element.textContent())
      const attribute = await element.getAttribute("style");

      if (attribute.includes("news")) {
        flag.push(true);
      }
      else {
        flag.push(false);
      }
    }
    console.log(flag);

    return flag;
  }


  async VerifyClickOnBillboardCard(): Promise<boolean> {
    // Click on random dot
    //Click on first Card
    //Verify page title is different than home page title
    // ----- Page can open in same tab as well as in separate tab.
    await this.ClickOnDots(Utilities.getRandomInt(0, 3));

    await this.page.waitForTimeout(2000);

    const card = await this.page.$(this.billboardPageObjects.BILLBOARD_CARD_LINK);

    await this.page.waitForTimeout(2000);

    //await this.page.waitForNavigation({ timeout: 10000 });

    if (await card.getAttribute("target") === "_blank") {

      const [popup] = await Promise.all([
        this.page.waitForEvent('popup'),
        await this.page.click(this.billboardPageObjects.BILLBOARD_SINGLE_CARD),
      ]);
      await popup.waitForLoadState('load');

      console.log(await popup.title());

      return await popup.title() != null ? true : false;

    } else {
      await this.page.click(this.billboardPageObjects.BILLBOARD_SINGLE_CARD)

      await this.page.waitForTimeout(2000);
      //await this.page.click(this.billboardPageObjects.BILLBOARD_SINGLE_CARD);
      console.log(await this.page.title());
      return await this.page.title() != null ? true : false;
    }
  }
}