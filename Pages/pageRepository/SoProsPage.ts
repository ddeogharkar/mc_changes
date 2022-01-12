import { Page } from "@playwright/test";
import { SoProsPageObjects } from "../pageObjects/SoProsPageObjects";
import testData from "../../Data/testData.json"
import { Utilities } from "../../Utils/Utilities";

export class SoProsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  SoProsPageObjects = new SoProsPageObjects();

  async VerifySoProsWebPartTitle(): Promise<boolean> {
    await this.page.locator(this.SoProsPageObjects.OBJ_SOPROS_WEBPART_TITLE).scrollIntoViewIfNeeded();
    const webPartTitle = await this.page.locator(this.SoProsPageObjects.OBJ_SOPROS_WEBPART_TITLE).textContent();
    console.log(webPartTitle);
    return webPartTitle === testData.SoProssWebPartTitle ? true : false;
  }

  async VerifySoProsTitlesArePresent(): Promise<boolean> {
    let titleArr = [];
    for (let index = 0; index < await this.GetTotalDots(); index++) {
      await this.ClickOnDot(index);
      let frame = this.page.frameLocator(this.SoProsPageObjects.OBJ_FRAME_SOPROS);
      let Title = frame.locator(this.SoProsPageObjects.OBJ_SOPROS_SUMMARY);
      let TitleText = await Title.textContent()
      titleArr.push(TitleText);
      console.log(TitleText)
    }
    return titleArr.includes("") ? false : true;
  }

  async GetTotalDots(): Promise<number> {
    let frame = this.page.frameLocator(this.SoProsPageObjects.OBJ_FRAME_SOPROS)
      .locator(this.SoProsPageObjects.OBJ_DOTS)
    console.log(await frame.count())
    return await frame.count();
  }

  async ClickOnDot(j: number): Promise<void> {
    let frame = await this.page.frameLocator(this.SoProsPageObjects.OBJ_FRAME_SOPROS)
      .locator(this.SoProsPageObjects.OBJ_DOTS).nth(j).click();
  }

  private async GetSoProsTitle(): Promise<string> {

    const newsTitle = this.page.frameLocator(this.SoProsPageObjects.OBJ_FRAME_SOPROS)
      .locator(this.SoProsPageObjects.OBJ_SOPROS_SUMMARY).nth(0);

    console.log(await newsTitle.textContent());
    return await newsTitle.textContent();
  }

  async VerifyNavigationToSoProsLandingPage(): Promise<boolean> {
    const randomNum = Utilities.getRandomInt(0, await this.GetTotalDots() - 1);
    await this.ClickOnDot(randomNum);
    //const ActualSoProsSummary = await this.GetSoProsTitle();
    const CurrentUrl = await this.page.title();
    const [popup] = await Promise.all([
      this.page.waitForEvent('popup'),

      this.page.frameLocator(this.SoProsPageObjects.OBJ_FRAME_SOPROS)
        .locator(this.SoProsPageObjects.OBJ_SOPROS_SUMMARY).nth(0).click()
    ]);
    await popup.waitForLoadState('load');

    console.log(popup.url());
    const NewUrl = popup.url();

    await this.page.bringToFront()

    return CurrentUrl != NewUrl ? true : false

  }

  async VerifyNavigationOnClickOnViewAllLnk(): Promise<boolean> {
    await this.page.locator(this.SoProsPageObjects.OBJ_SOPROS_VIEW_ALL_LINK).click();
    await this.page.waitForTimeout(5000);
    //await this.page.waitForNavigation();
    const ChannelName = await this.page.locator(this.SoProsPageObjects.OBJ_SOPROS_FU_CHANNEL_NAME).textContent();
    return testData.SoPros_FU_Channel_Name.includes(ChannelName) ? true : false;
  }

}