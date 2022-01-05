import { ElementHandle, Locator, Page } from "@playwright/test";
import { CommonPageObjects } from "../pageObjects/CommonPageObjects";

export class CommonPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  CommonPageObjects = new CommonPageObjects();

  async SearchFunction(ExpectedTitleLocator: string, CardLocator: string): Promise<boolean[]> {
    let flag = []
    let expectedTitle = await this.GetAllTitlesOnCard(ExpectedTitleLocator);
    console.log(expectedTitle[1])
    await this.SearchInPage(expectedTitle[1]);
    await this.ClickSearchIcon();

    for await (const iterator of await this.GetAllTitlesOnCard(CardLocator)) {
      if (iterator.includes(expectedTitle[1])) {
        flag.push(true)
      }
      else {
        flag.push(false)
      }
    }
    console.log(flag);
    return flag;
  }

  async GetAllTitlesOnCard(ele: string): Promise<string[]> {
    const cardTitleCollection = [];
    const titles = await this.page.$$(ele);
    for await (const iterator of titles) {
      const titleAtr = await iterator.textContent();
      cardTitleCollection.push(titleAtr);
    }
    return cardTitleCollection;
  }

  async SearchInPage(searchString: string): Promise<void> {
    const finalSearchString = await this.StringManipulation(searchString);
    console.log(finalSearchString);
    await this.page.locator(this.CommonPageObjects.OBJ_SEARCH_BOX).fill(finalSearchString);
  }

  async ClearSearchField(): Promise<void> {
    await this.page.locator(this.CommonPageObjects.OBJ_SEARCH_BOX).fill("");
    console.log("Field Cleared")
  }

  async ClickSearchIcon(): Promise<void> {
    await this.page.locator(this.CommonPageObjects.OBJ_SEARCH_ICON).click();
    await this.page.waitForTimeout(10000);
    console.log("Clicked search icon")
  }

  async StringManipulation(title: string): Promise<string> {
    let FinalStr = "";
    if (title.includes("..")) {
      const strArray = title.split(" ");
      for await (const iterator of strArray) {
        if (!iterator.includes("..")) {
          FinalStr = FinalStr + " " + iterator;
        }
      }
      return FinalStr.trim();
    }
    else {
      return title;
    }
  }

  async InValidSearchFunction(cardLocator: string): Promise<boolean> {
    let RandomTitle = "wheeledToLotusCourt motorToLotusCourt"
    await this.SearchInPage(RandomTitle);
    await this.ClickSearchIcon();
    let cards = (await this.page.$$(cardLocator)).length

    return cards === 0 ? true : false;
  }

  async GetAllCardsOnLandingPage(locator: string): Promise<ElementHandle[]> {
    let cardCollection = await this.page.$$(locator)
    return cardCollection;
  }
}