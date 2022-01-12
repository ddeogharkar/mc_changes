import test from "../fixture/baseTest";
import testData from "../Data/appData.json";
import { expect } from "@playwright/test";

test.describe("Validate OurVoices functionality", () => {
  //Login to theHeb application
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.NavigateToUrl(testData.homePageUrl);

    await loginPage.loginToApplication(
      testData.stageUserName,
      testData.password,
      testData.prodUserName
    );
  });
  test("OurVoices_Validate OurVoices functionality", async ({ ourVoicesPage }) => {
    await test.step("Test_01_Our_Verify_title_of_OurVoices_web_part", async () => {
      expect(await ourVoicesPage.VerifyOurVoicesWebPartTitle()).toBe(true);
    });

    await test.step("Test_02_OurVoices_Verify_Naigation_through_Dots_of_OurVoices", async () => {
      expect(await ourVoicesPage.VerifyOurVoicesTitlesArePresent()).toBe(true);
    });

    await test.step("Test_03_OurVoices_Verify_Naigation_OurVoices_Landing_Page", async () => {
      expect(await ourVoicesPage.VerifyNavigationToOurVoicesLandingPage()).toBe(true);
    });

    await test.step("Test_04_OurVoices_Verify_Naigation_To_LandingPage_of_OurVoices", async () => {
      expect(await ourVoicesPage.VerifyNavigationOnClickOnViewAllLnk()).toBe(true);
    });
  });
});

