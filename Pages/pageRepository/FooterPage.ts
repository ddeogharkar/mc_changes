import { Locator, Page } from "@playwright/test";
import { FooterPageObjects } from "../pageObjects/FooterPageObjects";
import testData from "../../Data/testData.json";

export class FooterPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  FooterPageObjects = new FooterPageObjects();

  async VerifyFooterExpands(): Promise<boolean> {
    await this.page.locator(this.FooterPageObjects.OBJ_FOOTER_EXPAND_COLLAPSE_LINK).scrollIntoViewIfNeeded({ timeout: 3000 });
    await this.page.click(this.FooterPageObjects.OBJ_FOOTER_EXPAND_COLLAPSE_LINK, { timeout: 5000 });
    let ariaHidden = await this.page.locator(this.FooterPageObjects.OBJ_FOOTER_ARIA_LABEL).getAttribute("aria-hidden")
    return ariaHidden === "true" ? true : false;
  }

  async VerifyOnlineGuidelinesLinkNavigation(): Promise<boolean> {
    await this.page.locator(this.FooterPageObjects.OBJ_FOOTER_ONLINE_GUIDELINES_LNK).scrollIntoViewIfNeeded();
    let onlineGuidelinesLink = await this.page.locator(this.FooterPageObjects.OBJ_FOOTER_ONLINE_GUIDELINES_LNK).getAttribute("href");
    return onlineGuidelinesLink.includes(testData.Online_Guidelines) ? true : false;
  }

  async VerifyPrivacyNoticeLinkNavigation(): Promise<boolean> {
    await this.page.locator(this.FooterPageObjects.OBJ_FOOTER_PRIVACY_NOTICE_LNK).scrollIntoViewIfNeeded();
    let PrivacyNoticeLink = await this.page.locator(this.FooterPageObjects.OBJ_FOOTER_PRIVACY_NOTICE_LNK).getAttribute("href");
    return PrivacyNoticeLink.includes(testData.Privacy_Notice) ? true : false;
  }

  async VerifyReportAbuseLinkNavigation(): Promise<boolean> {
    await this.page.locator(this.FooterPageObjects.OBJ_FOOTER_REPORT_ABUSE_LNK).scrollIntoViewIfNeeded();
    let ReportAbuseLink = await this.page.locator(this.FooterPageObjects.OBJ_FOOTER_REPORT_ABUSE_LNK).getAttribute("href");
    return ReportAbuseLink.includes(testData.Report_Abuse) ? true : false;
  }

  async VerifyInstagramLinkNavigation(): Promise<boolean> {
    await this.page.locator(this.FooterPageObjects.OBJ_FOOTER_INSTAGRAM).scrollIntoViewIfNeeded();
    const status = await this.VeriyNewTabUrlAndSwitchBack(this.FooterPageObjects.OBJ_FOOTER_INSTAGRAM, testData.Instagram)
    return status;
  }

  async VeriyNewTabUrlAndSwitchBack(ele: string, link: string): Promise<boolean> {
    const [popup] = await Promise.all([
      this.page.waitForEvent('popup'),
      await this.page.click(ele)
    ]);
    await popup.waitForLoadState('load');
    const url = popup.url();
    console.log(url);
    await this.page.bringToFront();
    await popup.close();
    return url.includes(link) ? true : false;
  }

  async VerifyTwitterLinkNavigation(): Promise<boolean> {
    await this.page.locator(this.FooterPageObjects.OBJ_FOOTER_TWITTER).scrollIntoViewIfNeeded();
    const status = await this.VeriyNewTabUrlAndSwitchBack(this.FooterPageObjects.OBJ_FOOTER_TWITTER, testData.Twitter)
    return status;
  }

  async VerifyLinkedInLinkNavigation(): Promise<boolean> {
    await this.page.locator(this.FooterPageObjects.OBJ_FOOTER_LINKEDIN).scrollIntoViewIfNeeded();
    const status = await this.VeriyNewTabUrlAndSwitchBack(this.FooterPageObjects.OBJ_FOOTER_LINKEDIN, testData.LinkedIn)
    return status;
  }

  async VerifyYoutubenLinkNavigation(): Promise<boolean> {
    await this.page.locator(this.FooterPageObjects.OBJ_FOOTER_YOUTUBE).scrollIntoViewIfNeeded();
    const status = await this.VeriyNewTabUrlAndSwitchBack(this.FooterPageObjects.OBJ_FOOTER_YOUTUBE, testData.Youtube)
    return status;
  }

  async VerifyFooterCollapses(): Promise<boolean> {
    await this.page.locator(this.FooterPageObjects.OBJ_FOOTER_EXPAND_COLLAPSE_LINK).scrollIntoViewIfNeeded({ timeout: 3000 });
    await this.page.click(this.FooterPageObjects.OBJ_FOOTER_EXPAND_COLLAPSE_LINK, { timeout: 5000 });
    let ariaHidden = await this.page.locator(this.FooterPageObjects.OBJ_FOOTER_ARIA_LABEL).getAttribute("aria-hidden")
    return ariaHidden === "false" ? true : false;
  }

}