import { Page } from "@playwright/test";
import { RegionalNewsPageObject } from "../pageObjects/RegionalNewsPageObject";
import testData from "../../Data/testData.json"
import { Utilities } from "../../Utils/Utilities";


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

  private async GetRegionalNewsTitle(): Promise<string> {

    const newsTitle = this.page.frameLocator(this.RegionalPageObjects.OBJ_FRAME_REGIONAL_NEWS)
      .locator(this.RegionalPageObjects.OBJ_REGIONAL_NEWS_TITLES).nth(0);

    console.log(await newsTitle.textContent());
    return await newsTitle.textContent();
  }

  async VerifyNavigationToRegionalNewsLandingPage(): Promise<boolean> {
    const randomNum = Utilities.getRandomInt(0, await this.GetTotalDots() - 1);
    await this.ClickOnDot(randomNum);
    const ActualRegionalNewsTitle = await this.GetRegionalNewsTitle();
    const [popup] = await Promise.all([
      this.page.waitForEvent('popup'),

      this.page.frameLocator(this.RegionalPageObjects.OBJ_FRAME_REGIONAL_NEWS)
        .locator(this.RegionalPageObjects.OBJ_REGIONAL_NEWS_TITLES).nth(0).click()
    ]);
    await popup.waitForLoadState('load');

    console.log(popup.url());
    const expectedRegionalNewsTitle = await popup.locator(this.RegionalPageObjects.OBJ_REGIONAL_NEWS_FU_TITLE).textContent();

    await this.page.bringToFront()

    return ActualRegionalNewsTitle === expectedRegionalNewsTitle ? true : false

  }

  async VerifyNavigationOnClickOnViewAllLnk(): Promise<boolean> {
    await this.page.locator(this.RegionalPageObjects.OBJ_REGIONAL_NEWS_VIEW_ALL_LINK).click();
    await this.page.waitForTimeout(5000);
    //await this.page.waitForNavigation();
    const ChannelName = await this.page.locator(this.RegionalPageObjects.OBJ_REGIONAL_NEWS_FU_CHANNEL_NAME).textContent();
    return testData.Regional_News_FU_Channel_Name.includes(ChannelName) ? true : false;
  }
}