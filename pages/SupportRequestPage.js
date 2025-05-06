class SupportRequestPage {
  constructor(page) {
    this.page = page;
    this.problemDescriptionInput = page.locator('input[name="support[enquiry][problem_description]"]');
    this.emailInput = page.locator('input[name="support[contact][email]"]');
    this.whenItStartedInput = page.locator('input[name="support[enquiry][when_it_started]"]');
    this.stepsToRecreateInput = page.locator('textarea[name="support[enquiry][steps_to_recreate]"]');
    this.companyNameInput = page.locator('input[name="support[contact][company]"]'); 
    this.fullNameInput = page.locator('input[name="support[contact][name]"]'); 
    this.phoneInput = page.locator('input[name="support[contact][phone]"]'); 
    this.bestTimeToFollowUpInput = page.locator('input[name="support[contact][time]"]'); 
    this.browserInput = page.locator('#input-browser'); 
    this.flashPlayerVersionInput = page.locator('#input-flash'); 
    this.sendRequestButton = page.getByRole('button', { name: 'Send request' });
  }

  async fillProblemDescription(text) {
    await this.problemDescriptionInput.fill(text);
  }

  async fillEmail(email) {
    await this.emailInput.fill(email);
  }

  async fillWhenItStarted(text) {
    await this.whenItStartedInput.fill(text);
  }

  async fillStepsToRecreate(text) {
    await this.stepsToRecreateInput.fill(text);
  }

  async fillCompanyName(name) {
    await this.companyNameInput.fill(name);
  }

  async fillFullName(name) {
    await this.fullNameInput.fill(name);
  }

  async fillPhone(phone) {
    await this.phoneInput.fill(phone);
  }

  async fillBestTimeToFollowUp(text) {
    await this.bestTimeToFollowUpInput.fill(text);
  }

  async fillTypeYourBrowser(browser) {
    await this.browserInput.fill(browser);
  }

  async fillFlashPlayerVersion(version) {
    await this.flashPlayerVersionInput.fill(version);
  }

  async clickSendRequestButton() {
    await this.sendRequestButton.click();
  }
}

module.exports = { SupportRequestPage };
