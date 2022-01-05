import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {

  use: {
    headless: false,
    channel: "chrome",
    viewport: { width: 1920, height: 1200 },
    //screenshot: "only-on-failure",
    //video: "retain-on-failure"
    trace: "on",
    //storageState: 'storageState.json'


  },
  testMatch: ["RegionalNews.test.ts"],//'**/*.test.ts'
  //reporter: [["dot"], ["json", { outputFile: "test-result.json" }]],
  //reporter: [[`./CustomReporterConfig.ts`], [`html`, { outputFolder: 'html-report' }]],
  timeout: 60000,
  //globalSetup: require.resolve('./global-setup')
  workers: 1,

}

export default config;