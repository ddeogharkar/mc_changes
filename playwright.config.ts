import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {


  // use: {
  //   headless: false,
  //   channel: "chrome",
  //   viewport: { width: 1920, height: 1200 },
  //   //screenshot: "only-on-failure",
  //   //video: "retain-on-failure"
  //   trace: "on",
  //   //storageState: 'storageState.json'
  // },

  projects: [
    // -- BrowserStack Projects --
    // name should be of the format browser@browser_version:os os_version@browserstack
    {
      name: 'chrome@latest:Windows 10@browserstack',
      use: {
        //browserName: 'chromium',
        channel: 'chrome',
        headless: false,
        viewport: { width: 1920, height: 1200 },
        //screenshot: `only-on-failure`,
        //video: `retain-on-failure`,
        trace: `retain-on-failure`,
      },
    },


    // {
    //   name: 'edge@90:Windows 10@browserstack',
    //   use: {
    //     browserName: 'chromium',
    //     headless: false,
    //     screenshot: `only-on-failure`,
    //     video: `retain-on-failure`,
    //     trace: `retain-on-failure`,
    //     launchOptions: {
    //       slowMo: 0
    //     },
    //   },
    // },


  ],

  testMatch: ["Footer.test.ts"],//'**/*.test.ts'
  //reporter: [["dot"], ["json", { outputFile: "test-result.json" }]],
  //reporter: [[`./CustomReporterConfig.ts`], [`html`, { outputFolder: 'html-report' }]],
  timeout: 120000,
  //globalSetup: require.resolve('./global-setup')
  workers: 1,

}

export default config;