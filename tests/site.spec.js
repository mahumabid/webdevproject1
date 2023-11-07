import { test, expect } from '@playwright/test';

const websiteURL = 'http://127.0.0.1:5500/documents/index1.html';
test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});


test('check that UTF-8 meta tag is present', async ({ page }) => {
  //Arrange: Go to the site homepage
  await page.goto(websiteURL);

  //Act: Get the content attribute of the meta charset tag
  const metaCharset = await page.$eval('meta[charset]', (meta) => meta.getAttribute('charset'));

  //Assert: Check if the charset is set to utf-8
  await expect(metaCharset).toBe('utf-8');
});

test('check that the viewport meta tag is present', async ({ page }) => {
  //Arrange: Go to the site homepage
  await page.goto(websiteURL);
  const metaViewport = await page.$eval('meta[name="viewport"]', (meta) => meta.getAttribute('content'));
  await expect(metaViewport).toBe('width=device-width, initial-scale=1.0');
});

/* This test checks that the meta keywords for SEO are not empty */
test('Check SEO Meta Keywords', async ({ page }) => {
  await page.goto(websiteURL);
  const metaKeywords = await page.getAttribute('meta[name="keywords"]', 'content');
  await expect(metaKeywords).not.toBe('');
});

test('check that the title is "Mahum Portfolio"', async ({ page }) => {
  // Using the page title to check that the title is "Mahum Portfolio"
  await page.goto(websiteURL);
await page.waitForTimeout(2000);
const actualTitle = await page.title();
console.log('Actual Title:', actualTitle);
await expect(actualTitle).toBe('Mahum Portfolio');
});

test('Check All Navigation Links', async ({ page }) => {
  const navLinks = await page.locator('.menu-item');
  const count = await navLinks.count();

  for (let i = 0; i < count; i++) {
    const link = navLinks.nth(i);
    expect(await link.isVisible()).toBe(true);
  }
});

test('Check All Footer Links', async ({ page }) => {
  const footerLinks = await page.locator('.icon-link');
  const count = await footerLinks.count();

  for (let i = 0; i < count; i++) {
    const link = footerLinks.nth(i);
    expect(await link.isVisible()).toBe(true);
  }
});

test('Check All Footer Icons', async ({ page }) => {
  const footerIcons = await page.locator('.icon-link');
  const count = await footerIcons.count();

  for (let i = 0; i < count; i++) {
    const icon = footerIcons.nth(i);
    expect(await icon.isVisible()).toBe(true);
  }
});