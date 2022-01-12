import { Page } from "@playwright/test";
import { OurVoicesPageObjects } from "../pageObjects/OurVoicesPageObjects";
import testData from "../../Data/testData.json"
import { Utilities } from "../../Utils/Utilities";

export class OurVoicesPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  OurVoicesPageObjects = new OurVoicesPageObjects();

  async VerifyOurVoicesWebPartTitle(): Promise<boolean> {
    const webPartTitle = await this.page.locator(this.OurVoicesPageObjects.OBJ_OUR_VOICES_WEBPART_TITLE).textContent();
    console.log(webPartTitle);
    return webPartTitle === testData.OurVoicesWebPartTitle ? true : false;
  }

  async VerifyOurVoicesTitlesArePresent(): Promise<boolean> {
    let titleArr = [];
    for (let index = 0; index < await this.GetTotalDots(); index++) {
      await this.ClickOnDot(index);
      for (let i = 0; i < 2; i++) {
        let frame = this.page.frameLocator(this.OurVoicesPageObjects.OBJ_FRAME_OUR_VOICES);
        let Title = frame.locator(this.OurVoicesPageObjects.OBJ_OUR_VOICES_TITLES).nth(i);
        let TitleText = await Title.textContent()
        titleArr.push(TitleText);
        console.log(TitleText)
      }
    }
    return titleArr.includes("") ? false : true;
  }

  async GetTotalDots(): Promise<number> {
    let frame = this.page.frameLocator(this.OurVoicesPageObjects.OBJ_FRAME_OUR_VOICES)
      .locator(this.OurVoicesPageObjects.OBJ_DOTS)
    console.log(await frame.count())
    return await frame.count();
  }

  async ClickOnDot(j: number): Promise<void> {
    let frame = await this.page.frameLocator(this.OurVoicesPageObjects.OBJ_FRAME_OUR_VOICES)
      .locator(this.OurVoicesPageObjects.OBJ_DOTS).nth(j).click();
  }

  private async GetOurVoicesTitle(): Promise<string> {

    const newsTitle = this.page.frameLocator(this.OurVoicesPageObjects.OBJ_FRAME_OUR_VOICES)
      .locator(this.OurVoicesPageObjects.OBJ_OUR_VOICES_TITLES).nth(0);

    console.log(await newsTitle.textContent());
    return await newsTitle.textContent();
  }

  async VerifyNavigationToOurVoicesLandingPage(): Promise<boolean> {
    const randomNum = Utilities.getRandomInt(0, await this.GetTotalDots() - 1);
    await this.ClickOnDot(randomNum);
    const ActualOurVoicesTitle = await this.GetOurVoicesTitle();
    const [popup] = await Promise.all([
      this.page.waitForEvent('popup'),

      this.page.frameLocator(this.OurVoicesPageObjects.OBJ_FRAME_OUR_VOICES)
        .locator(this.OurVoicesPageObjects.OBJ_OUR_VOICES_TITLES).nth(0).click()
    ]);
    await popup.waitForLoadState('load');

    console.log(popup.url());
    const expectedOurVoicesTitle = await popup.locator(this.OurVoicesPageObjects.OBJ_OUR_VOICES_FU_TITLE).textContent();

    await this.page.bringToFront()

    return ActualOurVoicesTitle === expectedOurVoicesTitle ? true : false

  }

  async VerifyNavigationOnClickOnViewAllLnk(): Promise<boolean> {
    await this.page.locator(this.OurVoicesPageObjects.OBJ_OUR_VOICES_VIEW_ALL_LINK).click();
    await this.page.waitForTimeout(5000);
    //await this.page.waitForNavigation();
    const ChannelName = await this.page.locator(this.OurVoicesPageObjects.OBJ_OUR_VOICES_FU_CHANNEL_NAME).textContent();
    return testData.OurVoices_FU_Channel_Name.includes(ChannelName) ? true : false;
  }

}