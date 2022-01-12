import test from "../fixture/baseTest";
import testData from "../Data/appData.json";
import { expect } from "@playwright/test";

test.describe("Validate Newsroom functionality", () => {
  //Login to theHeb application
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.NavigateToUrl(testData.homePageUrl);

    await loginPage.loginToApplication(
      testData.stageUserName,
      testData.password,
      testData.prodUserName
    );
  });

  test("Newsroom_Validate Newsroom functionality", async ({ newsroomPage }) => {
    await test.step("Test_01_Newsroom_title_of_Newsroom_web_part", async () => {
      expect(await newsroomPage.VerifyNewsroomWebPartTitle()).toBe(true);
    });

    await test.step("Test_02_Newsroom_Verify_Titles", async () => {
      expect(await newsroomPage.VerifyNewsroomCardTitles()).toBe(true);
    });

    await test.step("Test_03_Newsroom_Verify_Authors", async () => {
      expect(await newsroomPage.VerifyNewsroomCardAuthors()).toBe(true);
    });

    await test.step("Test_04_Newsroom_Verify_Navigation_After_Clicking_Card_Title", async () => {
      expect(await newsroomPage.VerifyCardIsClikable()).toBe(true);
    });

    await test.step("Test_05_Newsroom_Verify_Navigation_After_Clicking_ViewAll_Link", async () => {
      expect(await newsroomPage.VerifyNavigationAfterClickingViewAllLink()).toBe(true);
    });
  });
});