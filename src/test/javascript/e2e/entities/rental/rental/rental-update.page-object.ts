import { element, by, ElementFinder } from 'protractor';

export default class RentalUpdatePage {
  pageTitle: ElementFinder = element(by.id('gatewayApp.rentalRental.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  userIdInput: ElementFinder = element(by.css('input#rental-userId'));
  lateFeeInput: ElementFinder = element(by.css('input#rental-lateFee'));
  rentalStatusSelect: ElementFinder = element(by.css('select#rental-rentalStatus'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setUserIdInput(userId) {
    await this.userIdInput.sendKeys(userId);
  }

  async getUserIdInput() {
    return this.userIdInput.getAttribute('value');
  }

  async setLateFeeInput(lateFee) {
    await this.lateFeeInput.sendKeys(lateFee);
  }

  async getLateFeeInput() {
    return this.lateFeeInput.getAttribute('value');
  }

  async setRentalStatusSelect(rentalStatus) {
    await this.rentalStatusSelect.sendKeys(rentalStatus);
  }

  async getRentalStatusSelect() {
    return this.rentalStatusSelect.element(by.css('option:checked')).getText();
  }

  async rentalStatusSelectLastOption() {
    await this.rentalStatusSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
