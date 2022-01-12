import { ElementHandle, Page } from "@playwright/test";
import { NewsroomPageObjects } from "../pageObjects/NewsroomPageObjects";
import testData from "../../Data/testData.json"
import { Utilities } from "../../Utils/Utilities";

export class NewsroomPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  NewsroomPageObjects = new NewsroomPageObjects();

  async VerifyNewsroomWebPartTitle(): Promise<boolean> {
    await this.page.locator(this.NewsroomPageObjects.OBJ_NEWSROOM_WEBPART_TITLE).scrollIntoViewIfNeeded();
    const webPartTitle = await this.page.locator(this.NewsroomPageObjects.OBJ_NEWSROOM_WEBPART_TITLE).textContent();
    console.log(webPartTitle);
    return webPartTitle === testData.NewsroomWebPartTitle ? true : false;
  }

  async VerifyNewsroomCardTitles(): Promise<boolean> {
    let titles = [];
    for (let index = 0; index < await this.GetTotalDots(); index++) {
      await this.ClickOnDot(index);
      for (let j = 0; j < await this.GetTotalCards(); j++) {
        titles.push(await this.GetCardTitles(j))
      }
    }
    console.log(`Titles are : ${titles}`)
    return titles.length > 0 ? true : false;
  }

  async VerifyNewsroomCardAuthors(): Promise<boolean> {
    let authors = [];
    for (let index = 0; index < await this.GetTotalDots(); index++) {
      await this.ClickOnDot(index);
      for (let j = 0; j < await this.GetTotalCards(); j++) {
        authors.push(await this.GetCardAuthors(j))
      }
    }
    console.log(`Titles are : ${authors}`)
    return authors.length > 0 ? true : false;
  }

  async GetTotalDots(): Promise<number> {
    let dots = this.page.locator(this.NewsroomPageObjects.OBJ_DOTS)
    console.log(await dots.count())
    return await dots.count();
  }

  async ClickOnDot(j: number): Promise<void> {
    let frame = await this.page.locator(this.NewsroomPageObjects.OBJ_DOTS).nth(j).click();
    console.log(`Clicked on ${j + 1}th dot`);
    await this.page.waitForTimeout(3000);
  }

  async GetCards(): Promise<ElementHandle[]> {
    let cardTitles = await this.page.$$(this.NewsroomPageObjects.OBJ_NEWSROOM_CARDS)
    return cardTitles;
  }

  async GetCardTitles(i: number): Promise<string> {
    let cardTitles = this.page.locator(this.NewsroomPageObjects.OBJ_NEWSROOM_ARTICLE_TITLES).nth(i)
    console.log(await cardTitles.textContent());
    return await cardTitles.textContent();
  }

  async GetCardAuthors(i: number): Promise<string> {
    let cardAuthors = this.page.locator(this.NewsroomPageObjects.OBJ_NEWSROOM_ARTICLE_AUTHORS).nth(i)
    console.log(await cardAuthors.textContent());
    return await cardAuthors.textContent();
  }

  async GetTotalCards(): Promise<number> {
    let count = await this.page.$$(this.NewsroomPageObjects.OBJ_NEWSROOM_CARDS)
    return count.length;
  }

  async ClickOnCardTitle(i: number): Promise<void> {
    let cardTitles = this.page.locator(this.NewsroomPageObjects.OBJ_NEWSROOM_ARTICLE_TITLES).nth(i)
    console.log(await cardTitles.textContent());
    return await cardTitles.click();
  }

  async VerifyCardIsClikable(): Promise<boolean> {
    let homeUrl = this.page.url();
    let random = Utilities.getRandomInt(0, 3);

    const [popup] = await Promise.all([
      this.page.waitForEvent('popup'),
      this.ClickOnCardTitle(random)
    ]);
    await popup.waitForLoadState('load');
    console.log(popup.url());
    const popUpUrl = popup.url();
    popup.close();
    await this.page.bringToFront();
    return popUpUrl != homeUrl ? true : false;
  }

  async VerifyNavigationAfterClickingViewAllLink(): Promise<boolean> {
    let homeUrl = this.page.url();
    const [popup] = await Promise.all([
      this.page.waitForEvent('popup'),
      await this.page.locator(this.NewsroomPageObjects.VIEW_ALL_LINK).click()
    ]);
    await popup.waitForLoadState('load');
    console.log(popup.url());
    const popUpUrl = popup.url();
    popup.close();
    await this.page.bringToFront();
    return popUpUrl != homeUrl ? true : false;
  }
}