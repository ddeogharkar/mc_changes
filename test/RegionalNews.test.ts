import test from "../fixture/baseTest";
import testData from "../Data/appData.json";
import { expect } from "@playwright/test";


test.describe("Validate Regional News functionality", () => {
  //Login to theHeb application
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.NavigateToUrl(testData.homePageUrl);

    await loginPage.loginToApplication(
      testData.stageUserName,
      testData.password,
      testData.prodUserName
    );
  });
  test("Regional_News_Validate Regional News functionality", async ({ regionalNewsPage }) => {
    await test.step("Test_01_RegionalNews_Verify_title_of_Regional_News_web_part", async () => {
      expect(await regionalNewsPage.VerifyRegioanlNewsWebPartTitle()).toBe(true);
    });
    await test.step("Test_01_RegionalNews_Verify_Naigation_through_Dots_of_Regional_News", async () => {
      expect(await regionalNewsPage.VerifyRegioanlNewsTitlesArePresent()).toBe(true);
      //await regionalNewsPage.GetTotalDots();
    });
  });




});