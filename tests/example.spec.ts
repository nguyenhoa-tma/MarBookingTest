import { test, expect, devices } from '@playwright/test';
import type { Browser, BrowserContext, Page } from '@playwright/test';

test('should show no results when searching for unavailable Mars flights', async ({ browser }) => {
  const { page, context } = await newPage(browser);

  // Navigate to the Mars Booking page to verify booking functionality for a specific user scenario.
  await page.goto('https://marsair.recruiting.thoughtworks.net/HoaNguyenThiThanh');
  await page.getByLabel('Departing').selectOption('5');
  await page.getByLabel('Returning').selectOption('5');
  await page.getByRole('button', { name: 'Search' }).click();
  await expect(page.getByText('Sorry, there are no more')).toBeVisible();
  await page.getByRole('link', { name: 'Back' }).click();

  await context.close();
});


interface NewPageResult {
  page: Page;
  context: BrowserContext;
}

async function newPage(browser: Browser): Promise<NewPageResult> {
  const context: BrowserContext = await browser.newContext();
  const page: Page = await context.newPage();
  return { page, context };
}


