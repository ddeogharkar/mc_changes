import { Page } from "@playwright/test";
import { ScenesAroundMastercardPageObjects } from "../pageObjects/ScenesAroundMastercardPageObjects";
import testData from "../../Data/testData.json"
import { Utilities } from "../../Utils/Utilities";
import { CommonPage } from "./CommonPage";

export class ScenesAroundMastercardPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  ScenesAroundMastercardPageObjects = new ScenesAroundMastercardPageObjects();

  async VerifySAMWebPartTitle(): Promise<boolean> {
    await this.page.locator(this.ScenesAroundMastercardPageObjects.OBJ_SAM_WEBPART_TITLE).scrollIntoViewIfNeeded();
    const webPartTitle = await this.page.locator(this.ScenesAroundMastercardPageObjects.OBJ_SAM_WEBPART_TITLE).textContent();
    console.log(webPartTitle);
    return webPartTitle === testData.ScenesAroundMastercardWebPartTitle ? true : false;
  }

  async VerifySubmitPhotoLinkIsVisible(): Promise<boolean> {
    return await this.page.locator(this.ScenesAroundMastercardPageObjects.OBJ_SAM_SUBMIT_PHOTO_LINK).isVisible();
  }

  async ClickSubmitPhotoLnk(): Promise<void> {
    await this.page.locator(this.ScenesAroundMastercardPageObjects.OBJ_SAM_SUBMIT_PHOTO_LINK).click();
  }

  async VerifySubmitPhotoPopUpIsVisible(): Promise<boolean> {
    await this.page.waitForSelector(this.ScenesAroundMastercardPageObjects.OBJ_SAM_SUBMIT_PHOTO_POPUP);
    return await this.page.locator(this.ScenesAroundMastercardPageObjects.OBJ_SAM_SUBMIT_PHOTO_POPUP).isVisible();
  }

  async clickTwitterCheckBox(): Promise<void> {
    this.page.locator(this.ScenesAroundMastercardPageObjects.OBJ_SAM_ADD_TO_TWITTER_CHECKBOX).click();
  }

  async GetSuccessMessage(): Promise<string> {
    const msg = await this.page.waitForSelector(this.ScenesAroundMastercardPageObjects.OBJ_SAM_SUCCESS_MSG);
    console.log(await msg.textContent());
    return await msg.textContent();
  }

  async VerifyUserIsAbleToSubmitPhoto(): Promise<boolean> {
    const filePath = 'C:/Automation/Protractor-Automation/Test-sampleProt/Data/2018-07-05 canada-day.jpg'
    await this.ClickSubmitPhotoLnk();
    await this.VerifySubmitPhotoPopUpIsVisible();
    this.page.setInputFiles(this.ScenesAroundMastercardPageObjects.OBJ_SAM_CHOOSE_FILE, filePath);
    await this.clickTwitterCheckBox();
    await this.page.click(this.ScenesAroundMastercardPageObjects.OBJ_SAM_NEXT_BTN);
    await this.page.fill(this.ScenesAroundMastercardPageObjects.OBJ_SAM_PHOTO_CAPTION, "Automation Upload");
    const uploadBtn = await this.page.waitForSelector(this.ScenesAroundMastercardPageObjects.OBJ_SAM_UPLOAD_BTN);
    await uploadBtn.click();
    return await this.GetSuccessMessage() != null ? true : false;
  }

  async GetTotalDots(): Promise<number> {
    return await this.page.locator(this.ScenesAroundMastercardPageObjects.OBJ_SAM_DOTS).count();
  }

  async ClickOnDots(i: number) {
    await this.page.locator(this.ScenesAroundMastercardPageObjects.OBJ_SAM_DOTS).nth(i).click();
    await this.page.waitForTimeout(3000);
  }

  async GetTotalCards(): Promise<number> {
    return await this.page.locator(this.ScenesAroundMastercardPageObjects.OBJ_SAM_ACTIVE_CARDS).count();
  }

  async ClickOnImage() {
    await this.page.click(this.ScenesAroundMastercardPageObjects.OBJ_SAM_ACTIVE_CARD);
    console.log(`Clicked on Image`);
    await this.page.waitForTimeout(5000);
  }

  async VerifyImagePopupIsVisible(): Promise<boolean> {
    //let random = Utilities.getRandomInt(0, await this.GetTotalDots());
    //await this.ClickOnDots(random - 1);
    //let randomImageCnt = Utilities.getRandomInt(0, await this.GetTotalCards());
    //await this.ClickOnImage(randomImageCnt - 1);
    await this.page.click(this.ScenesAroundMastercardPageObjects.OBJ_SAM_ACTIVE_CARD);
    await this.page.waitForSelector(this.ScenesAroundMastercardPageObjects.OBJ_SAM_IMAGE_POPUP);
    let status = await this.page.locator(this.ScenesAroundMastercardPageObjects.OBJ_SAM_IMAGE_POPUP).isVisible() ? true : false;
    await this.ClickOnCloseBtn();
    return status;
  }

  async ClickOnCloseBtn() {
    await this.page.click(this.ScenesAroundMastercardPageObjects.OBJ_SAM_CLOSE_BTN_ON_POPUP);
    console.log(`Close button clicked...`)
    await this.page.waitForTimeout(3000);
  }

  async VerifyUserIsAbleToPostComment(): Promise<boolean> {
    let commonPage = new CommonPage(this.page);
    await this.ClickOnImage();
    const likeIcon = await this.page.waitForSelector(this.ScenesAroundMastercardPageObjects.OBJ_SAM_LIKE_ICON);
    likeIcon.click();
    console.log(`Like icon clicked....`);
    let status = await commonPage.PostComment();
    await this.ClickOnCloseBtn();
    return status;
  }

  async VerifyNavigationToLandingPageOnClickingViewAllLnk(): Promise<boolean> {
    let expectedPageTitle = testData.ScenesAroundMastercardLandingPageTitle;
    console.log(expectedPageTitle);
    await this.page.click(this.ScenesAroundMastercardPageObjects.OBJ_SAM_VIEW_ALL_LINK, { timeout: 5000 });
    await this.page.waitForNavigation();
    await this.page.waitForTimeout(5000);
    let actualPageTitle = await this.page.title();
    console.log(actualPageTitle);
    await this.page.waitForTimeout(5000);
    return expectedPageTitle === actualPageTitle ? true : false;
  }

  async VerifySearchWithValidTitle(): Promise<boolean> {
    let status: Boolean[];
    let commonPage = new CommonPage(this.page);

    status = await commonPage
      .SearchFunction(this.ScenesAroundMastercardPageObjects.OBJ_SAM_TITLES_ON_CARD, this.ScenesAroundMastercardPageObjects.OBJ_SAM_TITLES_ON_CARD)

    await commonPage.ClearSearchField();

    await commonPage.ClickSearchIcon();

    return status.includes(true) ? true : false;
  }

  async VerifySearchWithInValidTitle(): Promise<boolean> {
    let commonPage = new CommonPage(this.page);
    if (await commonPage.InValidSearchFunction(this.ScenesAroundMastercardPageObjects.OBJ_SAM_CARDS_ON_LANDING_PAGE)) {
      await commonPage.ClearSearchField();
      await commonPage.ClickSearchIcon();
      console.log(true);
      return true;
    }
    else {
      await commonPage.ClearSearchField();
      await commonPage.ClickSearchIcon();
      console.log(false);
      return false;
    }
  }

  async VerifyTitleOnCard(): Promise<boolean> {
    await this.page.waitForSelector(this.ScenesAroundMastercardPageObjects.OBJ_SAM_FIRST_CARD);
    await this.page.hover(this.ScenesAroundMastercardPageObjects.OBJ_SAM_FIRST_CARD);
    let titleCnt = await this.page.locator(this.ScenesAroundMastercardPageObjects.OBJ_SAM_FIRST_CARD).count();
    console.log(titleCnt);
    return titleCnt === 1 ? true : false;
  }

  async VerifyPopUpOnClickOfImageOnLandingPage(): Promise<boolean> {
    await this.page.waitForSelector(this.ScenesAroundMastercardPageObjects.OBJ_SAM_FIRST_CARD);
    await this.page.hover(this.ScenesAroundMastercardPageObjects.OBJ_SAM_FIRST_CARD);
    let expectedTitle = await this.page.locator(this.ScenesAroundMastercardPageObjects.OBJ_SAM_FIRST_CARD).textContent();
    console.log(expectedTitle);
    await this.page
      .locator(this.ScenesAroundMastercardPageObjects.OBJ_SAM_IMAGE_LINK_LANDING_PAGE).nth(0).click();
    await this.page.waitForTimeout(3000);
    let actualTitle = await this.page
      .locator(this.ScenesAroundMastercardPageObjects.OBJ_SAM_TITLE_ON_POPUP_CLASSIC).nth(0).textContent();
    console.log(actualTitle);
    return expectedTitle.trim() === actualTitle.trim() ? true : false;
  }

  async VerifyUserIsAbleToPostCommentOnClassicPopUp(): Promise<boolean> {
    let commonPage = new CommonPage(this.page);
    const likeIcon = await this.page.waitForSelector(this.ScenesAroundMastercardPageObjects.OBJ_SAM_LIKE_ICON);
    likeIcon.click();
    let status = await commonPage.PostComment();
    await this.ClickOnCloseBtn();
    return status;
  }

}