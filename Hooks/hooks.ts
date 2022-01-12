import { test as base } from "@playwright/test";
import cp from "child_process";
import { LoginPage } from "../Pages/pageRepository/LoginPage";
//import { testpage } from "./Page/testPage";
import appData from "../Data/appData.json";
import { TopNewsPage } from "../Pages/pageRepository/TopNewsPage";

const clientPlaywrightVersion = cp
  .execSync('npx playwright --version')
  .toString()
  .trim()
  .split(' ')[1];

const caps = {
  browser: 'chrome',
  os: 'Windows',
  os_version: '10',
  name: 'My first playwright test',
  build: 'playwright-build-1',
  browser_version: 'latest',
  'browserstack.username': process.env.BROWSERSTACK_USERNAME || 'devendradeoghark1',
  'browserstack.accessKey':
    process.env.BROWSERSTACK_ACCESS_KEY || 'nyx9WAQDQTXyVqA8Zn4x',
  'browserstack.local': process.env.BROWSERSTACK_LOCAL || false,
  'client.playwrightVersion': clientPlaywrightVersion,
};



// Patching the capabilities dynamically according to the project name.
const patchCaps = (name) => {
  let combination = name.split(/@browserstack/)[0];
  let [browerCaps, osCaps] = combination.split(/:/);
  let [browser, browser_version] = browerCaps.split(/@/);
  let osCapsSplit = osCaps.split(/ /);
  let os = osCapsSplit.shift();
  let os_version = osCapsSplit.join(' ');
  caps.browser = browser ? browser : 'chrome';
  caps.browser_version = browser_version ? browser_version : 'latest';
  caps.os = os ? os : 'osx';
  caps.os_version = os_version ? os_version : 'catalina';
  caps.name = name;
};

//let chromium: ChromiumBrowser

const isHash = (entity) => Boolean(entity && typeof (entity) === "object" && !Array.isArray(entity));
const nestedKeyValue = (hash, keys) => keys.reduce((hash, key) => (isHash(hash) ? hash[key] : undefined), hash);

const test = base.extend<{ browser, page, topNewsPage: TopNewsPage; loginPage: LoginPage }>({

  browser: async ({ playwright, browser }, use, workerInfo) => {
    if (workerInfo.project.name.match(/browserstack/)) {
      patchCaps(workerInfo.project.name);
      const vBrowser = await playwright.chromium.connect({
        wsEndpoint:
          `wss://cdp.browserstack.com/playwright?caps=` +
          `${encodeURIComponent(JSON.stringify(caps))}`,
      });
      await use(vBrowser);
    } else {
      // Use Local Browser for testing.
      await use(browser);
    }
  },
  page: async ({ page, browser }, use, testInfo) => {

    if (testInfo.project.name.match(/browserstack/)) {
      const vPage = await browser.newPage();
      await use(vPage);
      const testResult = {
        action: 'setSessionStatus',
        arguments: {
          status: testInfo.status,
          reason: nestedKeyValue(testInfo, ['error', 'message'])
        },
      };
      await vPage.evaluate(() => { },
        `browserstack_executor: ${JSON.stringify(testResult)}`);
      await vPage.close();
    } else {
      use(page);
    }
  },
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.NavigateToUrl(appData.homePageUrl);
    await loginPage.loginToApplication(appData.stageUserName, appData.password, appData.prodUserName)

    await use(loginPage);
  },
  topNewsPage: async ({ page }, use) => {
    await use(new TopNewsPage(page));
  }
})

export default test;