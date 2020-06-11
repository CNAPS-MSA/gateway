import { element, by, ElementFinder } from 'protractor';

export default class InStockBookUpdatePage {
  pageTitle: ElementFinder = element(by.id('gatewayApp.bookInStockBook.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  titleInput: ElementFinder = element(by.css('input#in-stock-book-title'));
  descriptionInput: ElementFinder = element(by.css('input#in-stock-book-description'));
  authorInput: ElementFinder = element(by.css('input#in-stock-book-author'));
  publisherInput: ElementFinder = element(by.css('input#in-stock-book-publisher'));
  isbnInput: ElementFinder = element(by.css('input#in-stock-book-isbn'));
  publicationDateInput: ElementFinder = element(by.css('input#in-stock-book-publicationDate'));
  sourceSelect: ElementFinder = element(by.css('select#in-stock-book-source'));

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

  async setSourceSelect(source) {
    await this.sourceSelect.sendKeys(source);
  }

  async getSourceSelect() {
    return this.sourceSelect.element(by.css('option:checked')).getText();
  }

  async sourceSelectLastOption() {
    await this.sourceSelect
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
