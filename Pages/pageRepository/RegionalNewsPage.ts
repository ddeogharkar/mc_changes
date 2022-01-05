import { Page } from "@playwright/test";
import { RegionalNewsPageObject } from "../pageObjects/RegionalNewsPageObject";
import testData from "../../Data/testData.json"


export class RegionalNewsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  RegionalPageObjects = new RegionalNewsPageObject();

  async VerifyRegioanlNewsWebPartTitle(): Promise<boolean> {
    const webPartTitle = await this.page.locator(this.RegionalPageObjects.OBJ_REGIONAL_NEWS_WEBPART_TITLE).textContent();
    console.log(webPartTitle);
    return webPartTitle === testData.RegioanlNewsWebPartTitle ? true : false;
  }

  async VerifyRegioanlNewsTitlesArePresent(): Promise<boolean> {
    let titleArr = [];
    for (let index = 0; index < await this.GetTotalDots(); index++) {
      await this.ClickOnDot(index);
      for (let i = 0; i < 2; i++) {
        let frame = this.page.frameLocator(this.RegionalPageObjects.OBJ_FRAME_REGIONAL_NEWS);
        let Title = frame.locator(this.RegionalPageObjects.OBJ_REGIONAL_NEWS_TITLES).nth(i);
        let TitleText = await Title.textContent()
        titleArr.push(TitleText);
      }
    }
    return titleArr.includes("") ? false : true;
  }

  async GetTotalDots(): Promise<number> {
    let frame = this.page.frameLocator(this.RegionalPageObjects.OBJ_FRAME_REGIONAL_NEWS)
      .locator(this.RegionalPageObjects.OBJ_DOTS)
    console.log(await frame.count())
    return await frame.count();
  }

  async ClickOnDot(j: number): Promise<void> {
    let frame = await this.page.frameLocator(this.RegionalPageObjects.OBJ_FRAME_REGIONAL_NEWS)
      .locator(this.RegionalPageObjects.OBJ_DOTS).nth(j).click();
  }
}