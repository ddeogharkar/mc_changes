import { expect } from "@playwright/test";
import testData from "../Data/appData.json";
import test from "../fixture/baseTest";

test.describe("Validate Footer functionality", () => {
  //Login to theHeb application
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.NavigateToUrl(testData.homePageUrl);

    await loginPage.loginToApplication(
      testData.stageUserName,
      testData.password,
      testData.prodUserName
    );
  });

  test("Footer_Validate footer functionality", async ({ footerPage }) => {
    await test.step("Test_01_Footer_Verify_Footer_expands_after_clicking__Expand_link", async () => {
      expect(await footerPage.VerifyFooterExpands()).toBe(true);
    });

    await test.step("Test_02_Footer_Verify_Online_Guidelines_link", async () => {
      expect(await footerPage.VerifyOnlineGuidelinesLinkNavigation()).toBe(true);
    });

    await test.step("Test_03_Footer_Verify_Privacy_Notice_link", async () => {
      expect(await footerPage.VerifyPrivacyNoticeLinkNavigation()).toBe(true);
    });

    await test.step("Test_04_Footer_Verify_Report_Abuse_link", async () => {
      expect(await footerPage.VerifyReportAbuseLinkNavigation()).toBe(true);
    });

    await test.step("Test_05_Footer_Verify_Instagram_Navigation", async () => {
      expect(await footerPage.VerifyInstagramLinkNavigation()).toBe(true);
    });

    await test.step("Test_06_Footer_Verify_Twitter_Navigation", async () => {
      expect(await footerPage.VerifyTwitterLinkNavigation()).toBe(true);
    });

    await test.step("Test_07_Footer_Verify_LinkedIn_Navigation", async () => {
      expect(await footerPage.VerifyLinkedInLinkNavigation()).toBe(true);
    });

    await test.step("Test_08_Footer_Verify_Youtube_Navigation", async () => {
      expect(await footerPage.VerifyYoutubenLinkNavigation()).toBe(true);
    });

    await test.step("Test_09_Footer_Verify_Footer_Collapse_after_Clicking", async () => {
      expect(await footerPage.VerifyFooterCollapses()).toBe(true);
    });
  });
});