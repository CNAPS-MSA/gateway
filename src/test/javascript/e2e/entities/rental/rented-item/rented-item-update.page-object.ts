import { element, by, ElementFinder } from 'protractor';

export default class RentedItemUpdatePage {
  pageTitle: ElementFinder = element(by.id('gatewayApp.rentalRentedItem.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  bookIdInput: ElementFinder = element(by.css('input#rented-item-bookId'));
  rentedDateInput: ElementFinder = element(by.css('input#rented-item-rentedDate'));
  dueDateInput: ElementFinder = element(by.css('input#rented-item-dueDate'));
  rentalSelect: ElementFinder = element(by.css('select#rented-item-rental'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setBookIdInput(bookId) {
    await this.bookIdInput.sendKeys(bookId);
  }

  async getBookIdInput() {
    return this.bookIdInput.getAttribute('value');
  }

  async setRentedDateInput(rentedDate) {
    await this.rentedDateInput.sendKeys(rentedDate);
  }

  async getRentedDateInput() {
    return this.rentedDateInput.getAttribute('value');
  }

  async setDueDateInput(dueDate) {
    await this.dueDateInput.sendKeys(dueDate);
  }

  async getDueDateInput() {
    return this.dueDateInput.getAttribute('value');
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
