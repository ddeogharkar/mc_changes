//import test from "@playwright/test";
//import { TopNewsPage } from "../Pages/pageRepository/TopNewsPage";
import test from "../fixture/baseTest";
import testData from "../Data/appData.json"

test.beforeEach(async ({ loginPage }) => {

  await loginPage.NavigateToUrl(testData.homePageUrl);

  await loginPage.loginToApplication(testData.stageUserName, testData.password, testData.prodUserName);

})


test("practice", async ({ topNewsPage }) => {
  for (let index = 0; index < await topNewsPage.GetTotalDots(); index++) {
    await topNewsPage.clickTopNewsDots(index)
  }
})


