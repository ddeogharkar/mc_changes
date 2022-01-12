import test from "../fixture/baseTest";
import testData from "../Data/appData.json";
import { expect } from "@playwright/test";

test.describe("Validate MCTV/Podcast functionality", () => {
  //Login to theHeb application
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.NavigateToUrl(testData.homePageUrl);

    await loginPage.loginToApplication(
      testData.stageUserName,
      testData.password,
      testData.prodUserName
    );
  });
  test("MCTV/Podcast_Validate MCTV/Podcast functionality", async ({ mctvpodcastPage }) => {
    await test.step("Test_01_Our_Verify_title_of_MCTV/Podcast_web_part", async () => {
      expect(await mctvpodcastPage.VerifyMCTV_PodcastWebPartTitle()).toBe(true);
    });

    await test.step("Test_02_MCTV/Podcast_Verify_Naigation_through_Dots_of_MCTV/Podcast", async () => {
      expect(await mctvpodcastPage.VerifyMCTV_PodcastTitlesArePresent()).toBe(true);
    });

    await test.step("Test_03_MCTV/Podcast_Verify_Naigation_MCTV/Podcast_Landing_Page", async () => {
      expect(await mctvpodcastPage.VerifyNavigationToMCTV_PodcastLandingPage()).toBe(true);
    });

    await test.step("Test_04_MCTV/Podcast_Verify_Naigation_To_LandingPage_of_MCTV/Podcast", async () => {
      expect(await mctvpodcastPage.VerifyNavigationOnClickOnViewAllLnk()).toBe(true);
    });
  });
});