import { ElementHandle, Locator, Page } from "@playwright/test";
import { Utilities } from "../../Utils/Utilities";
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
      console.log(iterator.trim());
      if (expectedTitle[1].trim().includes(iterator.trim())) {
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
    await this.page.waitForTimeout(5000);
    let cards = await this.page.$$(cardLocator);

    return cards.length === 0 ? true : false;
  }

  async GetAllCardsOnLandingPage(locator: string): Promise<ElementHandle[]> {
    let cardCollection = await this.page.$$(locator)
    return cardCollection;
  }

  async PostComment(): Promise<boolean> {
    let status = [];
    //await this.page.locator(this.CommonPageObjects.OBJ_COMMENTS_FIELD).scrollIntoViewIfNeeded();
    let commentTxt = `Test Comment ${Utilities.getRandomInt(1, 10)}`;
    await this.page.waitForSelector(this.CommonPageObjects.OBJ_COMMENTS_FIELD);
    await this.page.fill(this.CommonPageObjects.OBJ_COMMENTS_FIELD, commentTxt);
    await this.page.waitForTimeout(5000);
    await this.page.click(this.CommonPageObjects.OBJ_COMMENT_POST_BTN);
    await this.page.waitForTimeout(5000);
    let commentsCnt = await this.page.locator(this.CommonPageObjects.OBJ_COMMENT_POSTED).count();
    if (commentsCnt >= 1) {
      let postedCommentList = await this.page.$$(this.CommonPageObjects.OBJ_COMMENT_POSTED)
      for await (const item of postedCommentList) {
        let myComment = await item.textContent();
        console.log(myComment);
        if (myComment === commentTxt) {
          await this.DeleteComment();
          status.push(true);
        } else {
          status.push(false);
        }
      }
    }
    return status.includes(true) ? true : false;
  }

  async DeleteComment(): Promise<void> {
    await this.page.click(this.CommonPageObjects.OBJ_MENU_COMMENT);
    await this.page.click(this.CommonPageObjects.OBJ_COMMENT_DELETE_BTN);
    await this.page.click(this.CommonPageObjects.OBJ_YES_BTN_ON_DIALOG);
    await this.page.waitForTimeout(3000);
  }

}