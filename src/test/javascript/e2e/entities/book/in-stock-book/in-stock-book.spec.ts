import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import InStockBookComponentsPage, { InStockBookDeleteDialog } from './in-stock-book.page-object';
import InStockBookUpdatePage from './in-stock-book-update.page-object';
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

describe('InStockBook e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let inStockBookComponentsPage: InStockBookComponentsPage;
  let inStockBookUpdatePage: InStockBookUpdatePage;
  let inStockBookDeleteDialog: InStockBookDeleteDialog;
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

  it('should load InStockBooks', async () => {
    await navBarPage.getEntityPage('in-stock-book');
    inStockBookComponentsPage = new InStockBookComponentsPage();
    expect(await inStockBookComponentsPage.title.getText()).to.match(/In Stock Books/);

    expect(await inStockBookComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([inStockBookComponentsPage.noRecords, inStockBookComponentsPage.table]);

    beforeRecordsCount = (await isVisible(inStockBookComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(inStockBookComponentsPage.table);
  });

  it('should load create InStockBook page', async () => {
    await inStockBookComponentsPage.createButton.click();
    inStockBookUpdatePage = new InStockBookUpdatePage();
    expect(await inStockBookUpdatePage.getPageTitle().getAttribute('id')).to.match(/gatewayApp.bookInStockBook.home.createOrEditLabel/);
    await inStockBookUpdatePage.cancel();
  });

  it('should create and save InStockBooks', async () => {
    await inStockBookComponentsPage.createButton.click();
    await inStockBookUpdatePage.setTitleInput('title');
    expect(await inStockBookUpdatePage.getTitleInput()).to.match(/title/);
    await inStockBookUpdatePage.setDescriptionInput('description');
    expect(await inStockBookUpdatePage.getDescriptionInput()).to.match(/description/);
    await inStockBookUpdatePage.setAuthorInput('author');
    expect(await inStockBookUpdatePage.getAuthorInput()).to.match(/author/);
    await inStockBookUpdatePage.setPublisherInput('publisher');
    expect(await inStockBookUpdatePage.getPublisherInput()).to.match(/publisher/);
    await inStockBookUpdatePage.setIsbnInput('5');
    expect(await inStockBookUpdatePage.getIsbnInput()).to.eq('5');
    await inStockBookUpdatePage.setPublicationDateInput('01-01-2001');
    expect(await inStockBookUpdatePage.getPublicationDateInput()).to.eq('2001-01-01');
    await inStockBookUpdatePage.sourceSelectLastOption();
    await waitUntilDisplayed(inStockBookUpdatePage.saveButton);
    await inStockBookUpdatePage.save();
    await waitUntilHidden(inStockBookUpdatePage.saveButton);
    expect(await isVisible(inStockBookUpdatePage.saveButton)).to.be.false;

    expect(await inStockBookComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(inStockBookComponentsPage.table);

    await waitUntilCount(inStockBookComponentsPage.records, beforeRecordsCount + 1);
    expect(await inStockBookComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last InStockBook', async () => {
    const deleteButton = inStockBookComponentsPage.getDeleteButton(inStockBookComponentsPage.records.last());
    await click(deleteButton);

    inStockBookDeleteDialog = new InStockBookDeleteDialog();
    await waitUntilDisplayed(inStockBookDeleteDialog.deleteModal);
    expect(await inStockBookDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gatewayApp.bookInStockBook.delete.question/);
    await inStockBookDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(inStockBookDeleteDialog.deleteModal);

    expect(await isVisible(inStockBookDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([inStockBookComponentsPage.noRecords, inStockBookComponentsPage.table]);

    const afterCount = (await isVisible(inStockBookComponentsPage.noRecords)) ? 0 : await getRecordsCount(inStockBookComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
