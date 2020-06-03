import { element, by, ElementFinder } from 'protractor';

export default class BookUpdatePage {
  pageTitle: ElementFinder = element(by.id('gatewayApp.bookBook.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  titleInput: ElementFinder = element(by.css('input#book-title'));
  authorInput: ElementFinder = element(by.css('input#book-author'));
  descriptionInput: ElementFinder = element(by.css('input#book-description'));
  bookStatusSelect: ElementFinder = element(by.css('select#book-bookStatus'));
  categorySelect: ElementFinder = element(by.css('select#book-category'));
  barcodeInput: ElementFinder = element(by.css('input#book-barcode'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTitleInput(title) {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput() {
    return this.titleInput.getAttribute('value');
  }

  async setAuthorInput(author) {
    await this.authorInput.sendKeys(author);
  }

  async getAuthorInput() {
    return this.authorInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async setBookStatusSelect(bookStatus) {
    await this.bookStatusSelect.sendKeys(bookStatus);
  }

  async getBookStatusSelect() {
    return this.bookStatusSelect.element(by.css('option:checked')).getText();
  }

  async bookStatusSelectLastOption() {
    await this.bookStatusSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setCategorySelect(category) {
    await this.categorySelect.sendKeys(category);
  }

  async getCategorySelect() {
    return this.categorySelect.element(by.css('option:checked')).getText();
  }

  async categorySelectLastOption() {
    await this.categorySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setBarcodeInput(barcode) {
    await this.barcodeInput.sendKeys(barcode);
  }

  async getBarcodeInput() {
    return this.barcodeInput.getAttribute('value');
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
