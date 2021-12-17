import test, { Page } from "@playwright/test";
import { LoginPage } from "../Pages/pageRepository/LoginPage";
import testData from "../Data/appData.json"

let page: Page;
let loginPage: LoginPage;

test.beforeAll(async ({ browser }) => {

  page = await browser.newPage();

  loginPage = new LoginPage(page);

  await loginPage.NavigateToUrl(testData.homePageUrl);

  await loginPage.loginToApplication(testData.stageUserName, testData.password, testData.prodUserName);

  console.log("Execute before all tests");
})