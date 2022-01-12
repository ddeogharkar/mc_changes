import test from "../fixture/baseTest";
import testData from "../Data/appData.json";
import { expect } from "@playwright/test";

test.describe("Validate SoPros functionality", () => {
  //Login to theHeb application
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.NavigateToUrl(testData.homePageUrl);

    await loginPage.loginToApplication(
      testData.stageUserName,
      testData.password,
      testData.prodUserName
    );
  });
  test("OurVoices_Validate SoPros functionality", async ({ soProsPage }) => {
    await test.step("Test_01_Our_Verify_title_of_SoPros_web_part", async () => {
      expect(await soProsPage.VerifySoProsWebPartTitle()).toBe(true);
    });

    await test.step("Test_02_SoPros_Verify_Naigation_through_Dots_of_SoPros", async () => {
      expect(await soProsPage.VerifySoProsTitlesArePresent()).toBe(true);
    });

    await test.step("Test_03_SoPros_Verify_Naigation_OurVoices_Landing_Page", async () => {
      expect(await soProsPage.VerifyNavigationToSoProsLandingPage()).toBe(true);
    });

    await test.step("Test_04_SoPros_Verify_Naigation_To_LandingPage_of_SoPros", async () => {
      expect(await soProsPage.VerifyNavigationOnClickOnViewAllLnk()).toBe(true);
    });
  });
});

