import { test as baseTest } from "@playwright/test";
import { BillboardPage } from "../Pages/pageRepository/BillboardPage";
import { EventsPage } from "../Pages/pageRepository/EventsPage";
import { HomePage } from "../Pages/pageRepository/HomePage";
import { LoginPage } from "../Pages/pageRepository/LoginPage";
import { TopNewsPage } from "../Pages/pageRepository/TopNewsPage";
import { testpage } from "../testPage/testpage";
import { RegionalNewsPage } from "../Pages/pageRepository/RegionalNewsPage";
import { OurVoicesPage } from "../Pages/pageRepository/OurVoicesPage";
import { MCTVPodcastPage } from "../Pages/pageRepository/MCTVPodcastPage";
import { SoProsPage } from "../Pages/pageRepository/SoProsPage";
import { NewsroomPage } from "../Pages/pageRepository/NewsroomPage";
import { ScenesAroundMastercardPage } from "../Pages/pageRepository/ScenesAroundMastercardPage";
import { FooterPage } from "../Pages/pageRepository/FooterPage";

const test = baseTest.extend<{
  testPage: testpage;
  loginPage: LoginPage;
  homePage: HomePage;
  topNewsPage: TopNewsPage;
  billboardPage: BillboardPage;
  eventsPage: EventsPage;
  regionalNewsPage: RegionalNewsPage;
  ourVoicesPage: OurVoicesPage;
  mctvpodcastPage: MCTVPodcastPage;
  soProsPage: SoProsPage;
  newsroomPage: NewsroomPage;
  scenesAroundMastercardPage: ScenesAroundMastercardPage;
  footerPage: FooterPage;
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
  },
  ourVoicesPage: async ({ page }, use) => {
    await use(new OurVoicesPage(page));
  },
  mctvpodcastPage: async ({ page }, use) => {
    await use(new MCTVPodcastPage(page));
  },
  soProsPage: async ({ page }, use) => {
    await use(new SoProsPage(page));
  },
  newsroomPage: async ({ page }, use) => {
    await use(new NewsroomPage(page));
  },
  scenesAroundMastercardPage: async ({ page }, use) => {
    await use(new ScenesAroundMastercardPage(page));
  },
  footerPage: async ({ page }, use) => {
    await use(new FooterPage(page));
  },
})

export default test;
