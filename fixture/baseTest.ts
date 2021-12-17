import { test as baseTest } from "@playwright/test";
import { HomePage } from "../Pages/pageRepository/HomePage";
import { LoginPage } from "../Pages/pageRepository/LoginPage";
import { TopNewsPage } from "../Pages/pageRepository/TopNewsPage";
import { testpage } from "../testPage/testpage";


const test = baseTest.extend<{
  testPage: testpage;
  loginPage: LoginPage;
  homePage: HomePage;
  topNewsPage: TopNewsPage;
}>({
  testPage: async ({ page }, use) => {
    await use(new testpage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  topNewsPage: async ({ page }, use) => {
    await use(new TopNewsPage(page));
  }

})

export default test;
