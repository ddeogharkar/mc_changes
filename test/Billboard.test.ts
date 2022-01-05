import { expect } from "@playwright/test";
import testData from "../Data/appData.json"
import test from "../fixture/baseTest";


test.describe("Validate Billboard functionality", () => {
  //Login to theHeb application
  test.beforeEach(async ({ loginPage }) => {

    await loginPage.NavigateToUrl(testData.homePageUrl);

    await loginPage.loginToApplication(testData.stageUserName, testData.password, testData.prodUserName);

  })

  test("Validate Billboard container", async ({ billboardPage }) => {
    await test.step("Test_01_Billboard_Verify_Billboard_Webpart_Is_Visible", async () => {
      expect(await billboardPage.VerifyBillBoardWebPartIsVisible()).toBe(true);
    })

    await test.step("Test_02_Billboard_Verify_Title_Of_Billbaord_WebPart", async () => {
      expect(await billboardPage.VerifyTitleOfBillboardWebPart()).toBe(true);
    })

    await test.step("Test_03_Billboard_Verify_Billboard_Cards", async () => {
      expect(await billboardPage.VerifyBillboardCards()).toContain(true);
    })

    await test.step("Test_04_Billboard_Verify_Billboard_Cards", async () => {
      expect(await billboardPage.VerifyClickOnBillboardCard()).toBe(true);
    })
  })
})