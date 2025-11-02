import type { Browser, BrowserContext, Page } from '@playwright/test';

export interface NewPageResult {
  page: Page;
  context: BrowserContext;
}

export async function newPage(browser: Browser): Promise<NewPageResult> {
  const context = await browser.newContext();
  const page = await context.newPage();
  return { page, context };
}
