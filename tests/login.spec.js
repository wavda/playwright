const { test, expect, devices } = require('@playwright/test');

const config = {
  reporter: [ ['junit', { outputFile: 'results.xml' }] ],
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  use: {
    trace: 'on',
    screenshot: 'on',
    video: 'on'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
};

module.exports = config;

test('Login as admin', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/');
  await expect(page).toHaveTitle(/OrangeHRM/);
  await page.locator('input[name="txtUsername"]').fill('Admin');
  await page.locator('input[name="txtPassword"]').fill('admin123');
  await page.locator('input:has-text("LOGIN")').click();
  await page.waitForURL('https://opensource-demo.orangehrmlive.com/index.php/dashboard');
  await page.locator('id=welcome').click();
});
