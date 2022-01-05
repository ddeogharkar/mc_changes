import { ElementHandle, Locator, Page } from "@playwright/test";
import { Utilities } from "../../Utils/Utilities";
import { EventsPageObjects } from "../pageObjects/EventsPageObjects";
import testData from "../../Data/testData.json"
import { CommonPage } from "../pageRepository/CommonPage"

export class EventsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  EventsPageObjects = new EventsPageObjects();


  async VerifyEventsLinkExists(): Promise<boolean> {
    const eventsBtn = this.page.locator(
      this.EventsPageObjects.OBJ_EVENTS_BUTTON
    );

    await eventsBtn.scrollIntoViewIfNeeded();

    if (await eventsBtn.isVisible()) return true;
    else return false;
  }

  async VerifyEventsBtnCollapsed(): Promise<boolean> {
    let flag = await this.page
      .locator(this.EventsPageObjects.OBJ_EVENTS_BUTTON)
      .getAttribute("aria-expanded");
    return flag === "false" ? true : false;
  }

  async GetEventsListFromAccordion(): Promise<ElementHandle[]> {
    const ele = await this.page.$$(this.EventsPageObjects.OBJ_EVENTSLIST);
    console.log(ele.length);
    return ele;
  }

  async ClickOnEventsLink(i: number): Promise<void> {
    await this.page.locator(this.EventsPageObjects.OBJ_EVENTSLIST).nth(i).click();
  }

  async VerifyEventPopUpOnHomePage(): Promise<boolean> {
    if ((await this.VerifyEventsLinkExists()) === true) {
      if (await this.VerifyEventsBtnCollapsed() === true)
        await this.page.locator(this.EventsPageObjects.OBJ_EVENTS_BUTTON).click();
      const random = Utilities.getRandomInt(0, (await this.GetEventsListFromAccordion()).length - 1);
      //await (await this.GetEventsListFromAccordion()).at(random).click();
      await this.ClickOnEventsLink(random);
      await this.page.waitForTimeout(3000);
      const status = await this.page.waitForSelector(this.EventsPageObjects.OBJ_EVENTS_POP_UP_HOME_PAGE);
      let flag = status.isVisible();
      console.log(flag);
      this.ClickCloseBtnOnEventsPopUp();
      return flag ? true : false;
    }
  }
  async ClickCloseBtnOnEventsPopUp(): Promise<void> {
    const iframe = this.page.frameLocator(this.EventsPageObjects.OBJ_EVENTS_POPUP_IFRAME)
    await iframe.locator(this.EventsPageObjects.OBJ_CLOSE_BTN_POP_UP).click();
  }

  async VerifyEventsLandingPageOnLickOfViewAllLink(): Promise<boolean> {
    const ExpectedGlobalEvetsLandingPageTitle = testData.GlobalEventsLandingPageTitle;
    console.log(ExpectedGlobalEvetsLandingPageTitle);
    await this.page.locator(this.EventsPageObjects.OBJ_VIEW_ALL_LINK_GLOBAL).click();
    await this.page.waitForNavigation({ timeout: 10000 });
    await this.page.waitForSelector(this.EventsPageObjects.OBJ_CALENDAR_VIEW_BTN);
    const ActualGlobalEvetsLandingPageTitle = await this.page.title();
    console.log(ActualGlobalEvetsLandingPageTitle)
    return ActualGlobalEvetsLandingPageTitle === ExpectedGlobalEvetsLandingPageTitle ? true : false;
  }

  async VerifyMonthOnEventCard(): Promise<boolean> {
    let _month = [];
    const ele = await this.page.$$(this.EventsPageObjects.OBJ_MONTH_ON_EVENTS_CARD);
    console.log(ele.length);
    for await (const iterator of ele) {
      console.log(await iterator.innerText());
      _month.push(await iterator.innerText())
    }

    if (_month.includes("")) {
      return false;
    } else {
      return true;
    }

    // const repos = ele.map(async (repo, i) => {
    //   console.log(await repo.innerText());
    //   return await repo.innerText();
    // })

    // return repos != null ? true : false;

  }

  async VerifyDayOnEventCard(): Promise<boolean> {
    let _month = [];
    const ele = await this.page.$$(this.EventsPageObjects.OBJ_DAY_ON_EVENTS_CARD);
    console.log(ele.length);
    for await (const iterator of ele) {
      console.log(await iterator.innerText());
      _month.push(await iterator.innerText())
    }

    if (_month.includes("")) {
      return false;
    } else {
      return true;
    }
  }

  async VerifyCategoryOnEventCard(): Promise<boolean> {
    let _month = [];
    const ele = await this.page.$$(this.EventsPageObjects.OBJ_CAREGORY_ON_EVENTS_CARD);
    console.log(ele.length);
    for await (const iterator of ele) {
      console.log(await iterator.innerText());
      _month.push(await iterator.innerText())
    }

    if (_month.includes("")) {
      return false;
    } else {
      return true;
    }
  }

  async VerifyTitleOnEventCard(): Promise<boolean> {
    let _month = [];
    const ele = await this.page.$$(this.EventsPageObjects.OBJ_TITLE_ON_EVENTS_CARD);
    console.log(ele.length);
    for await (const iterator of ele) {
      console.log(await iterator.innerText());
      _month.push(await iterator.innerText())
    }

    if (_month.includes("")) {
      return false;
    } else {
      return true;
    }
  }

  async VerifyDateOnEventCard(): Promise<boolean> {
    let _month = [];
    const ele = await this.page.$$(this.EventsPageObjects.OBJ_DATE_ON_EVENTS_CARD);
    console.log(ele.length);
    for await (const iterator of ele) {
      console.log(await iterator.innerText());
      _month.push(await iterator.innerText())
    }

    if (_month.includes("")) {
      return false;
    } else {
      return true;
    }
  }

  async VerifyAddToCalendarOnEventCard(): Promise<boolean> {
    let _month = [];
    const ele = await this.page.$$(this.EventsPageObjects.OBJ_ADD_To_CALENDAR_ON_CARD);
    console.log(ele.length);
    for await (const iterator of ele) {
      console.log(await iterator.innerText());
      _month.push(await iterator.innerText())
    }

    if (_month.includes("")) {
      return false;
    } else {
      return true;
    }
  }

  async VerifyHoverOverTextOnEventsCardsOnLandingPage(): Promise<boolean> {
    let HoverOverText = [];
    const allCards = await this.page.$$(this.EventsPageObjects.OBJ_EVENTS_CARDS_ON_LANDING_PAGE)
    for await (const iterator of allCards) {
      await iterator.getAttribute("title")
      console.log(await iterator.innerText())
      HoverOverText.push(await iterator.innerText())
    }
    return HoverOverText.includes("") ? false : true;
  }

  async VerifyValidSearchIsWorking(): Promise<boolean> {
    let status: Boolean[];
    let commonPage = new CommonPage(this.page);

    status = await commonPage
      .SearchFunction(this.EventsPageObjects.OBJ_Events_CARD_TITLE_ON_LANDING_Page, this.EventsPageObjects.OBJ_EVENTS_CARDS_ON_LANDING_PAGE)

    await commonPage.ClearSearchField();

    await commonPage.ClickSearchIcon();

    return status.includes(true) ? true : false;
  }

  async VerifySearchWithInvalidTitle(): Promise<boolean> {
    let commonPage = new CommonPage(this.page);
    if (commonPage.InValidSearchFunction(this.EventsPageObjects.OBJ_EVENTS_CARDS_ON_LANDING_PAGE)) {
      commonPage.ClearSearchField();
      commonPage.ClickSearchIcon();
      return true;
    }
    else {
      commonPage.ClearSearchField();
      commonPage.ClickSearchIcon();
      return false;
    }
  }

  async VerifyEventPopUpOnEventsLandingPage(): Promise<boolean> {
    let commonPage = new CommonPage(this.page);
    const cards = await commonPage.GetAllCardsOnLandingPage(this.EventsPageObjects.OBJ_EVENTS_CARDS_ON_LANDING_PAGE);
    await cards[1].click();
    await this.page.waitForTimeout(5000);
    const ele = await this.page.waitForSelector(this.EventsPageObjects.OBJ_EVENT_POP_UP_ON_LANDING_PAGE);
    const status = await ele.isVisible();
    const iframe = this.page.frameLocator(this.EventsPageObjects.OBJ_EVENT_POP_UP_IFRAME_ON_LANDING_PAGE);
    await iframe.locator(this.EventsPageObjects.OBJ_CLOSE_BTN_ON_EVENT_POP_UP_ON_LANDING_PAGE).click();
    return status;
  }
}
