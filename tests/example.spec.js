const { test, expect, devices } = require('@playwright/test');

const config = {
  reporter: [ ['html', { open: 'always' }] ],
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

test('Login test', async ({ page }) => {
  await page.goto('https://dev-front.niagahoster.co.id/');
  await expect(page).toHaveTitle(/Hosting/);
  await page.locator('text=1 Member Area Logout Login >> [aria-label="Sign In"]').click();
  await page.locator('text=Email Password Lupa password? >> [placeholder="nama\\@email\\.com"]').fill('wavda@hostinger.com');
  await page.locator('[placeholder="Masukkan Password Anda"]').fill('test@12345');
  await page.locator('text=Masuk Sekarang Juga').click();
  await page.waitForURL('https://dev-rest.niagahoster.co.id/client');
  await page.locator('text=Hallo, Wavda A').click();
  await page.screenshot({ path: './screenshots/screenshot.png', fullPage: true });
});
