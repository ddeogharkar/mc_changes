import test from "../fixture/baseTest";
import testData from "../Data/appData.json"


test("sample test", async ({ loginPage, topNewsPage }) => {
  await loginPage.NavigateToUrl(testData.homePageUrl);

  await loginPage.loginToApplication(testData.stageUserName, testData.password, testData.prodUserName);

  await topNewsPage.clickTopNewsDots(3);


})