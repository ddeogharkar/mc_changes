import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {

  use: {
    headless: false,
    channel: "chrome",
    viewport: { width: 1920, height: 1200 },
    //screenshot: "only-on-failure",
    //video: "retain-on-failure"
    trace: "on"

  },
  testMatch: ["TopNews.test.ts"],
  //reporter: [["dot"], ["json", { outputFile: "test-result.json" }]],
  timeout: 120000

}

export default config;