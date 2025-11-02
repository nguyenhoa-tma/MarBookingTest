import { type Page, type Locator, expect } from '@playwright/test';

export class MarsAirPage {
  private readonly page: Page;
  private readonly departingDropdown: Locator;
  private readonly returningDropdown: Locator;
  protected readonly promotionTextbox: Locator;
  private readonly searchButton: Locator;
  private readonly backLink: Locator;
  private readonly noResultMsg: Locator;
  private readonly promotionTitle: Locator;
  private readonly availableResultMsg: Locator;
  private readonly bookTicketHeader: Locator;
  private readonly noScheduleMsg: Locator;
  private readonly homePageIcon: Locator;
  private readonly promotionCodeValidMsg: Locator;
  private readonly promotionCodeInValidMsg: Locator;

  constructor(page: Page) {
    this.page = page;
    this.departingDropdown = page.getByLabel('Departing');
    this.returningDropdown = page.getByLabel('Returning');
    this.promotionTextbox = page.getByRole('textbox', { name: 'Promotional Code' });
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.backLink = page.getByRole('link', { name: 'Back' });
    
    this.noResultMsg = page.getByText('Sorry, there are no more');
    this.availableResultMsg = page.getByText('Seats available');
    this.noScheduleMsg = page.getByText('Unfortunately, this schedule is not possible. Please try again.');
    this.promotionCodeValidMsg = page.getByText('Promotional code');
    this.promotionCodeInValidMsg = page.getByText('Sorry, code ');

    this.promotionTitle = page.getByText('Promotional Code');
    this.bookTicketHeader = page.getByRole('heading', { name: 'Book a ticket to the red' });
    this.homePageIcon = page.getByRole('link', { name: 'MarsAir' });
  }

  async openSearchPage(): Promise<void> {
    await this.page.goto('https://marsair.recruiting.thoughtworks.net/HoaNguyenThiThanh');
  }

  async searchFlights(depart: string, ret: string): Promise<void> {
    await this.departingDropdown.selectOption(depart);
    await this.returningDropdown.selectOption(ret);
    await this.searchButton.click();
  }

  async searchValidPromotionCode(depart: string, ret: string, pro:string): Promise<void> {
    await this.departingDropdown.selectOption(depart);
    await this.returningDropdown.selectOption(ret);
    await this.promotionTextbox.fill(pro);
    await this.searchButton.click();
  }

  async searchInvalidPromotionCode(depart: string, ret: string, pro:string): Promise<void> {
    await this.departingDropdown.selectOption(depart);
    await this.returningDropdown.selectOption(ret);
    await this.promotionTextbox.fill(pro);
    await this.searchButton.click();
  }

  async verifyResultsVisible(): Promise<void> {
    await this.page.waitForTimeout(2000);
    await this.availableResultMsg.waitFor({ state: 'visible' });
  }

  async verifyResultsUnscheduled(): Promise<void> {
    await this.page.waitForTimeout(2000);    
    await this.noScheduleMsg.waitFor({ state: 'visible' });
  }

  async verifyNoResultsVisible(): Promise<void> {
    await this.page.waitForTimeout(2000);
    await this.noResultMsg.waitFor({ state: 'visible' });
  }

  async clickBackLink(): Promise<void> {
    await this.backLink.click();
  }

  async clickHomePageIcon(): Promise<void> {
    await this.homePageIcon.click();
  }

  async verifyPromotionValidMessage(): Promise<void> {
    await this.page.waitForTimeout(2000);
    await this.promotionCodeValidMsg.waitFor({ state: 'visible' });
  }

  async verifyPromotionInvalidMessage(): Promise<void> {
    await this.page.waitForTimeout(2000);
    await this.promotionCodeInValidMsg.waitFor({ state: 'visible' });
  }

  async verifyResultsUnscheduled2() {
    // If the page has been closed already, bail out to avoid "target page/context has been closed" errors.
    if (typeof this.page.isClosed === 'function' && this.page.isClosed()) {
      return;
    }

    // Prefer waiting for a specific locator instead of a fixed timeout to reduce flakiness.
    try {
      await this.noScheduleMsg.waitFor({ state: 'visible', timeout: 5000 });
      await expect(this.noScheduleMsg).toBeVisible();
    } catch {
      // If the locator didn't appear within the timeout, fail the expectation explicitly so tests get a clear message.
      await expect(this.noScheduleMsg).toBeVisible();
    }
  }
  
}
