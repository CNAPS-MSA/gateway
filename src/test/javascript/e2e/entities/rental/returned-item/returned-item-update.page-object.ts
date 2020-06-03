import { element, by, ElementFinder } from 'protractor';

export default class ReturnedItemUpdatePage {
  pageTitle: ElementFinder = element(by.id('gatewayApp.rentalReturnedItem.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  bookIdInput: ElementFinder = element(by.css('input#returned-item-bookId'));
  returnedDateInput: ElementFinder = element(by.css('input#returned-item-returnedDate'));
  bookTitleInput: ElementFinder = element(by.css('input#returned-item-bookTitle'));
  rentalSelect: ElementFinder = element(by.css('select#returned-item-rental'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setBookIdInput(bookId) {
    await this.bookIdInput.sendKeys(bookId);
  }

  async getBookIdInput() {
    return this.bookIdInput.getAttribute('value');
  }

  async setReturnedDateInput(returnedDate) {
    await this.returnedDateInput.sendKeys(returnedDate);
  }

  async getReturnedDateInput() {
    return this.returnedDateInput.getAttribute('value');
  }

  async setBookTitleInput(bookTitle) {
    await this.bookTitleInput.sendKeys(bookTitle);
  }

  async getBookTitleInput() {
    return this.bookTitleInput.getAttribute('value');
  }

  async rentalSelectLastOption() {
    await this.rentalSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async rentalSelectOption(option) {
    await this.rentalSelect.sendKeys(option);
  }

  getRentalSelect() {
    return this.rentalSelect;
  }

  async getRentalSelectedOption() {
    return this.rentalSelect.element(by.css('option:checked')).getText();
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
