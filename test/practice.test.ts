import test from "@playwright/test";
//import { TopNewsPage } from "../Pages/pageRepository/TopNewsPage";
//import test from "../fixture/baseTest";
//import testData from "../Data/appData.json"
import { Utilities } from "../Utils/Utilities";
import globalSetup from "../global-setup";

// test.beforeEach(async ({ loginPage }) => {

//   await loginPage.NavigateToUrl(testData.homePageUrl);

//   await loginPage.loginToApplication(testData.stageUserName, testData.password, testData.prodUserName);

// })


//test("practice", async () => {
//   for (let index = 0; index < await topNewsPage.GetTotalDots(); index++) {
//     await topNewsPage.clickTopNewsDots(index)
//   }
// })


//let utils: Utilities

test("practice", async ({ page }) => {
  //utils = new Utilities();
  console.log(await page.title());
  //Utilities.getRandomInt(10, 20);
})


