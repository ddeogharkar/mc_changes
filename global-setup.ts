// import { chromium, FullConfig } from '@playwright/test';

// async function globalSetup(config: FullConfig) {
//   const browser = await chromium.launch();
//   const page = await browser.newPage();
//   await page.goto('https://github.com/login');
//   await page.fill('input[name="login"]', 'username');
//   await page.fill('input[name="password"]', 'passsword');
//   await page.click('text=Sign in');
//   //Save signed-in state to 'storageState.json'.
//   await page.context().storageState({ path: 'storageState.json' });
//   await browser.close();
// }

// export default globalSetup;