import { element, by, ElementFinder } from 'protractor';

export default class BookUpdatePage {
  pageTitle: ElementFinder = element(by.id('gatewayApp.bookBook.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  titleInput: ElementFinder = element(by.css('input#book-title'));
  descriptionInput: ElementFinder = element(by.css('input#book-description'));
  authorInput: ElementFinder = element(by.css('input#book-author'));
  publisherInput: ElementFinder = element(by.css('input#book-publisher'));
  isbnInput: ElementFinder = element(by.css('input#book-isbn'));
  publicationDateInput: ElementFinder = element(by.css('input#book-publicationDate'));
  classificationSelect: ElementFinder = element(by.css('select#book-classification'));
  bookStatusSelect: ElementFinder = element(by.css('select#book-bookStatus'));
  locationSelect: ElementFinder = element(by.css('select#book-location'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTitleInput(title) {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput() {
    return this.titleInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async setAuthorInput(author) {
    await this.authorInput.sendKeys(author);
  }

  async getAuthorInput() {
    return this.authorInput.getAttribute('value');
  }

  async setPublisherInput(publisher) {
    await this.publisherInput.sendKeys(publisher);
  }

  async getPublisherInput() {
    return this.publisherInput.getAttribute('value');
  }

  async setIsbnInput(isbn) {
    await this.isbnInput.sendKeys(isbn);
  }

  async getIsbnInput() {
    return this.isbnInput.getAttribute('value');
  }

  async setPublicationDateInput(publicationDate) {
    await this.publicationDateInput.sendKeys(publicationDate);
  }

  async getPublicationDateInput() {
    return this.publicationDateInput.getAttribute('value');
  }

  async setClassificationSelect(classification) {
    await this.classificationSelect.sendKeys(classification);
  }

  async getClassificationSelect() {
    return this.classificationSelect.element(by.css('option:checked')).getText();
  }

  async classificationSelectLastOption() {
    await this.classificationSelect
      .all(by.tagName('option'))
      .last()
      .click();
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
  async setLocationSelect(location) {
    await this.locationSelect.sendKeys(location);
  }

  async getLocationSelect() {
    return this.locationSelect.element(by.css('option:checked')).getText();
  }

  async locationSelectLastOption() {
    await this.locationSelect
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
