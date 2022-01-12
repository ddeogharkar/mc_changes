import test from "../fixture/baseTest";
//import test from "../Hooks/hooks";
import testData from "../Data/appData.json"
import { expect } from "@playwright/test";

test.describe("Validate Top News Functionality", () => {

  //Login to theHeb application
  test.beforeEach(async ({ loginPage }) => {

    await loginPage.NavigateToUrl(testData.homePageUrl);

    await loginPage.loginToApplication(testData.stageUserName, testData.password, testData.prodUserName);

  })

  test("Top news container functionality validation", async ({ topNewsPage }) => {
    // Verify top news webpart is visible
    await test.step("Test_01_TopNews_Verify_Top_News_Web_Part_Is_Visible", async () => {
      expect(await topNewsPage.TopNewsWebPartIsVisible()).toBe(true);
    })

    //Verify News title, Hero Image & Summary is displaying on Top News
    await test.step("Test_02_TopNews_Verify_HeroImage_Title_Summary_Is_Displaying_On_All_The_TopNews_Articles", async () => {

      expect(await topNewsPage.VerifyTopNewsImageTitleAndSummary()).toBe(true);

    })

    //Verify the navigation after clicking on the top news article
    await test.step("Test_03_TopNews_Verify_After_Clicking_Article_NavigateTo_Article_LandingPage", async () => {
      expect(await topNewsPage.VerifyNavigationToArticleLandingPage()).toBe(true);

    })
    //Veify navigation to first up article landing page after clicking View all link
    await test.step("Test_04_TopNews_Verify_Click_ViewAll_Link_And_Verify_The_Navigation_To_LandingPage", async () => {
      expect(await topNewsPage.VerifyNavigationLandingPageAfterClikingViewAllLink()).toBe(true);
    })

  })

})

