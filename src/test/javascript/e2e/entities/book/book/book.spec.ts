import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import BookComponentsPage, { BookDeleteDialog } from './book.page-object';
import BookUpdatePage from './book-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible
} from '../../../util/utils';

const expect = chai.expect;

describe('Book e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let bookComponentsPage: BookComponentsPage;
  let bookUpdatePage: BookUpdatePage;
  let bookDeleteDialog: BookDeleteDialog;
  let beforeRecordsCount = 0;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  it('should load Books', async () => {
    await navBarPage.getEntityPage('book');
    bookComponentsPage = new BookComponentsPage();
    expect(await bookComponentsPage.title.getText()).to.match(/Books/);

    expect(await bookComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([bookComponentsPage.noRecords, bookComponentsPage.table]);

    beforeRecordsCount = (await isVisible(bookComponentsPage.noRecords)) ? 0 : await getRecordsCount(bookComponentsPage.table);
  });

  it('should load create Book page', async () => {
    await bookComponentsPage.createButton.click();
    bookUpdatePage = new BookUpdatePage();
    expect(await bookUpdatePage.getPageTitle().getAttribute('id')).to.match(/gatewayApp.bookBook.home.createOrEditLabel/);
    await bookUpdatePage.cancel();
  });

  it('should create and save Books', async () => {
    await bookComponentsPage.createButton.click();
    await bookUpdatePage.setTitleInput('title');
    expect(await bookUpdatePage.getTitleInput()).to.match(/title/);
    await bookUpdatePage.setDescriptionInput('description');
    expect(await bookUpdatePage.getDescriptionInput()).to.match(/description/);
    await bookUpdatePage.setAuthorInput('author');
    expect(await bookUpdatePage.getAuthorInput()).to.match(/author/);
    await bookUpdatePage.setPublisherInput('publisher');
    expect(await bookUpdatePage.getPublisherInput()).to.match(/publisher/);
    await bookUpdatePage.setIsbnInput('5');
    expect(await bookUpdatePage.getIsbnInput()).to.eq('5');
    await bookUpdatePage.setPublicationDateInput('01-01-2001');
    expect(await bookUpdatePage.getPublicationDateInput()).to.eq('2001-01-01');
    await bookUpdatePage.classificationSelectLastOption();
    await bookUpdatePage.bookStatusSelectLastOption();
    await bookUpdatePage.locationSelectLastOption();
    await waitUntilDisplayed(bookUpdatePage.saveButton);
    await bookUpdatePage.save();
    await waitUntilHidden(bookUpdatePage.saveButton);
    expect(await isVisible(bookUpdatePage.saveButton)).to.be.false;

    expect(await bookComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(bookComponentsPage.table);

    await waitUntilCount(bookComponentsPage.records, beforeRecordsCount + 1);
    expect(await bookComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Book', async () => {
    const deleteButton = bookComponentsPage.getDeleteButton(bookComponentsPage.records.last());
    await click(deleteButton);

    bookDeleteDialog = new BookDeleteDialog();
    await waitUntilDisplayed(bookDeleteDialog.deleteModal);
    expect(await bookDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gatewayApp.bookBook.delete.question/);
    await bookDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(bookDeleteDialog.deleteModal);

    expect(await isVisible(bookDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([bookComponentsPage.noRecords, bookComponentsPage.table]);

    const afterCount = (await isVisible(bookComponentsPage.noRecords)) ? 0 : await getRecordsCount(bookComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
