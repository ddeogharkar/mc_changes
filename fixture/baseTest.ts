import { test as baseTest } from "@playwright/test";
import { BillboardPage } from "../Pages/pageRepository/BillboardPage";
import { EventsPage } from "../Pages/pageRepository/EventsPage";
import { HomePage } from "../Pages/pageRepository/HomePage";
import { LoginPage } from "../Pages/pageRepository/LoginPage";
import { TopNewsPage } from "../Pages/pageRepository/TopNewsPage";
import { testpage } from "../testPage/testpage";
import { RegionalNewsPage } from "../Pages/pageRepository/RegionalNewsPage";



const test = baseTest.extend<{
  testPage: testpage;
  loginPage: LoginPage;
  homePage: HomePage;
  topNewsPage: TopNewsPage;
  billboardPage: BillboardPage;
  eventsPage: EventsPage;
  regionalNewsPage: RegionalNewsPage;
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
  },
  billboardPage: async ({ page }, use) => {
    await use(new BillboardPage(page));
  },
  eventsPage: async ({ page }, use) => {
    await use(new EventsPage(page));
  },
  regionalNewsPage: async ({ page }, use) => {
    await use(new RegionalNewsPage(page));
  }

})

export default test;
