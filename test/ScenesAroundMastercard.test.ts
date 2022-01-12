import test from "../fixture/baseTest";
import testData from "../Data/appData.json";
import { expect } from "@playwright/test";

test.describe("Validate Scenes Around Mastercard functionality", () => {
  //Login to theHeb application
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.NavigateToUrl(testData.homePageUrl);

    await loginPage.loginToApplication(
      testData.stageUserName,
      testData.password,
      testData.prodUserName
    );
  });
  test("OurVoices_Validate Scenes Around Mastercard functionality", async ({ scenesAroundMastercardPage }) => {
    await test.step("Test_01_Verify_title_of_Scenes_Around_Mastercard_web_part", async () => {
      expect(await scenesAroundMastercardPage.VerifySAMWebPartTitle()).toBe(true);
    });

    await test.step("Test_02_Verify_Submit_Photo_Link_On_Scenes_Around_Mastercard_web_part", async () => {
      expect(await scenesAroundMastercardPage.VerifySubmitPhotoLinkIsVisible()).toBe(true);
    });

    await test.step("Test_03_Verify_Upload_Photo_Functionality", async () => {
      expect(await scenesAroundMastercardPage.VerifyUserIsAbleToSubmitPhoto()).toBe(true);

    });

    await test.step("Test_04_Verify_PopUp_After_Click_On_Image", async () => {
      expect(await scenesAroundMastercardPage.VerifyImagePopupIsVisible()).toBe(true);
    });

    await test.step("Test_05_Verify_User_Is_Able_To_Post_Comment", async () => {
      expect(await scenesAroundMastercardPage.VerifyUserIsAbleToPostComment()).toBe(true);
    });

    await test.step("Test_06_Verify_User_Is_Able_To_Navigate_To_LandingPage_On_Clicking_ViewAll_Link", async () => {
      expect(await scenesAroundMastercardPage.VerifyNavigationToLandingPageOnClickingViewAllLnk()).toBe(true);
    });

    await test.step("Test_07_Verify_Search_With_Valid_Title", async () => {
      expect(await scenesAroundMastercardPage.VerifySearchWithValidTitle()).toBe(true);
    });

    await test.step("Test_08_Verify_Search_With_InValid_Title", async () => {
      expect(await scenesAroundMastercardPage.VerifySearchWithInValidTitle()).toBe(true);
    });

    await test.step("Test_09_Verify_Title_On_Card_IsPresent", async () => {
      expect(await scenesAroundMastercardPage.VerifyTitleOnCard()).toBe(true);
    });

    await test.step("Test_10_Verify_PopUp_On_Click_Of_Image_On_Landing_Page", async () => {
      expect(await scenesAroundMastercardPage.VerifyPopUpOnClickOfImageOnLandingPage()).toBe(true);
    });

    await test.step("Test_11_Verify_PopUp_On_Click_Of_Image_On_Landing_Page", async () => {
      expect(await scenesAroundMastercardPage.VerifyUserIsAbleToPostCommentOnClassicPopUp()).toBe(true);
    });

  });
});

