import { Page } from "@playwright/test";
import { TopNewsPageObjects } from "../pageObjects/TopNewsPageObjects";
import testData from "../../Data/testData.json"
import { Utilities } from "../../Utils/Utilities";

export class TopNewsPage {

  readonly page: Page;


  constructor(page: Page) {
    this.page = page;

  }

  topNewsPageObjects = new TopNewsPageObjects();

  // async clickTopNewsDots(): Promise<void> {
  //   await this.page.frameLocator(this.topNewsPageObjects.TOPNEWS_IFRAME)
  //     .locator(this.topNewsPageObjects.TOPNEWS_DOT).click();
  // }

  async clickTopNewsDots(i: number): Promise<void> {
    const dotsClick = this.page.frameLocator(this.topNewsPageObjects.TOPNEWS_IFRAME)
    await dotsClick.locator(this.topNewsPageObjects.TOPNEWS_DOTS).nth(i).click();
    await this.page.waitForTimeout(1000);
  }

  async goThroughDots(): Promise<void> {
    for (let index = 0; index < await this.GetTotalDots(); index++) {
      await this.clickTopNewsDots(index)
    }
  }

  async TopNewsWebPartIsVisible(): Promise<boolean> {
    const webpartStatus = await this.page.isVisible(this.topNewsPageObjects.TOPNEWS_WEBPART);
    return webpartStatus;
  }

  async GetTotalDots(): Promise<number> {

    let totalDotsCount = this.page.frameLocator(this.topNewsPageObjects.TOPNEWS_IFRAME)
      .locator(this.topNewsPageObjects.TOPNEWS_DOTS)

    console.log(await totalDotsCount.count());

    return await totalDotsCount.count();
  }

  private async VerifyTopNewsImageIsPresent(): Promise<boolean> {
    let imageURL = await this.page.frameLocator(this.topNewsPageObjects.TOPNEWS_IFRAME)
      .locator(this.topNewsPageObjects.TOPNEWS_IMAGE).getAttribute("style")


    if (imageURL.includes(testData.TopNewsImageURL)) {
      console.log(true)
      return true;
    } else {
      console.log(false)
      return false;
    }
  }

  private async GetTopNewsTitle(): Promise<string> {

    const newsTitle = this.page.frameLocator(this.topNewsPageObjects.TOPNEWS_IFRAME)
      .locator(this.topNewsPageObjects.TOPNEWS_TITLE);

    console.log(await newsTitle.textContent());
    return await newsTitle.textContent();
  }

  private async GetTopNewsSummary(): Promise<string> {
    const newsSummary = this.page.frameLocator(this.topNewsPageObjects.TOPNEWS_IFRAME)
      .locator(this.topNewsPageObjects.TOPNEWS_SUMMARY);
    console.log(await newsSummary.textContent());
    return await newsSummary.textContent()
  }

  async TopNewsImageTitleAndSummary(): Promise<boolean[]> {

    let flag = []

    for (let index = 0; index < await this.GetTotalDots(); index++) {

      await this.clickTopNewsDots(index)

      if (await this.VerifyTopNewsImageIsPresent() && await this.GetTopNewsTitle() != null && await this.GetTopNewsSummary() != null) {
        flag.push(true);
      }
      else {
        flag.push(false);
      }
    }
    console.log("flag :" + flag)
    //console.log(`Flag contains :${flag}`)
    return flag;
  }

  async VerifyTopNewsImageTitleAndSummary(): Promise<boolean> {
    const flag = await this.TopNewsImageTitleAndSummary()
    //console.log(`Flag contains :${flag}`)
    console.log("flag :" + flag)
    if (flag.includes(true)) {
      return true;
    }
    else {
      return false;
    }
  }

  async VerifyNavigationToArticleLandingPage(): Promise<boolean> {
    const randomNum = Utilities.getRandomInt(0, await this.GetTotalDots() - 1);
    await this.clickTopNewsDots(randomNum);

    const ActualTopNewsTitle = await this.GetTopNewsTitle();

    const [popup] = await Promise.all([
      this.page.waitForEvent('popup'),

      this.page.frameLocator(this.topNewsPageObjects.TOPNEWS_IFRAME)
        .locator(this.topNewsPageObjects.TOPNEWS_IMAGE_COLLECTION).click()
    ]);
    await popup.waitForLoadState('load');

    console.log(popup.url());

    const expectedTopNewsTitle = await popup.locator(this.topNewsPageObjects.FIRSTUP_IMAGE_TITLE).textContent();

    return ActualTopNewsTitle === expectedTopNewsTitle ? true : false
  }

  async VerifyNavigationLandingPageAfterClikingViewAllLink(): Promise<boolean> {

    const viewAllLink = await this.page.waitForSelector(this.topNewsPageObjects.VIEW_ALL_LINK);
    await viewAllLink.click();

    await this.page.waitForTimeout(5000);

    const actualChanelName = this.page.locator(this.topNewsPageObjects.FIRSTUP_CHANEL_NAME).textContent();

    console.log(await actualChanelName);

    const expectedChanelName = testData.GlobalChannelName;

    return await actualChanelName === expectedChanelName ? true : false;

  }

}