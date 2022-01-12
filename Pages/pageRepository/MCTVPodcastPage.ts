import { Page } from "@playwright/test";
import { MCTV_PodcastPageObjects } from "../pageObjects/MCTV_PodcastPageObjects";
import testData from "../../Data/testData.json"
import { Utilities } from "../../Utils/Utilities";

export class MCTVPodcastPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  MCTV_PodcastPageObjects = new MCTV_PodcastPageObjects();

  async VerifyMCTV_PodcastWebPartTitle(): Promise<boolean> {
    const webPartTitle = await this.page.locator(this.MCTV_PodcastPageObjects.OBJ_MCTV_PODCAST_WEBPART_TITLE).textContent();
    console.log(webPartTitle);
    return webPartTitle === testData.MCTV_PodcastWebPartTitle ? true : false;
  }

  async VerifyMCTV_PodcastTitlesArePresent(): Promise<boolean> {
    let titleArr = [];
    for (let index = 0; index < await this.GetTotalDots(); index++) {
      await this.ClickOnDot(index);
      for (let i = 0; i < 2; i++) {
        let frame = this.page.frameLocator(this.MCTV_PodcastPageObjects.OBJ_FRAME_MCTV_PODCAST);
        let Title = frame.locator(this.MCTV_PodcastPageObjects.OBJ_MCTV_PODCAST_TITLES).nth(i);
        let TitleText = await Title.textContent()
        titleArr.push(TitleText);
        console.log(TitleText)
      }
    }
    return titleArr.includes("") ? false : true;
  }

  async GetTotalDots(): Promise<number> {
    let frame = this.page.frameLocator(this.MCTV_PodcastPageObjects.OBJ_FRAME_MCTV_PODCAST)
      .locator(this.MCTV_PodcastPageObjects.OBJ_DOTS)
    console.log(await frame.count())
    return await frame.count();
  }

  async ClickOnDot(j: number): Promise<void> {
    let frame = await this.page.frameLocator(this.MCTV_PodcastPageObjects.OBJ_FRAME_MCTV_PODCAST)
      .locator(this.MCTV_PodcastPageObjects.OBJ_DOTS).nth(j).click();
  }

  private async GetMCTV_PodcastTitle(): Promise<string> {

    const newsTitle = this.page.frameLocator(this.MCTV_PodcastPageObjects.OBJ_FRAME_MCTV_PODCAST)
      .locator(this.MCTV_PodcastPageObjects.OBJ_MCTV_PODCAST_TITLES).nth(0);

    console.log(await newsTitle.textContent());
    return await newsTitle.textContent();
  }

  async VerifyNavigationToMCTV_PodcastLandingPage(): Promise<boolean> {
    const randomNum = Utilities.getRandomInt(0, await this.GetTotalDots() - 1);
    await this.ClickOnDot(randomNum);
    const ActualMCTV_PodcastTitle = await this.GetMCTV_PodcastTitle();
    const [popup] = await Promise.all([
      this.page.waitForEvent('popup'),

      this.page.frameLocator(this.MCTV_PodcastPageObjects.OBJ_FRAME_MCTV_PODCAST)
        .locator(this.MCTV_PodcastPageObjects.OBJ_MCTV_PODCAST_TITLES).nth(0).click()
    ]);
    await popup.waitForLoadState('load');

    console.log(popup.url());
    const expectedMCTV_PodcastTitle = await popup.locator(this.MCTV_PodcastPageObjects.OBJ_MCTV_PODCAST_FU_TITLE).textContent();

    await this.page.bringToFront()

    return ActualMCTV_PodcastTitle === expectedMCTV_PodcastTitle ? true : false
  }

  async VerifyNavigationOnClickOnViewAllLnk(): Promise<boolean> {
    await this.page.locator(this.MCTV_PodcastPageObjects.OBJ_MCTV_PODCAST_VIEW_ALL_LINK).click();
    await this.page.waitForTimeout(5000);
    //await this.page.waitForNavigation();
    const ChannelName = await this.page.locator(this.MCTV_PodcastPageObjects.OBJ_MCTV_PODCAST_FU_CHANNEL_NAME).textContent();
    return testData.MCTV_Podcast_FU_Channel_Name.includes(ChannelName) ? true : false;
  }
}