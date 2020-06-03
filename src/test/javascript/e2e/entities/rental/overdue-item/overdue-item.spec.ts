import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import OverdueItemComponentsPage, { OverdueItemDeleteDialog } from './overdue-item.page-object';
import OverdueItemUpdatePage from './overdue-item-update.page-object';
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

describe('OverdueItem e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let overdueItemComponentsPage: OverdueItemComponentsPage;
  let overdueItemUpdatePage: OverdueItemUpdatePage;
  let overdueItemDeleteDialog: OverdueItemDeleteDialog;
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

  it('should load OverdueItems', async () => {
    await navBarPage.getEntityPage('overdue-item');
    overdueItemComponentsPage = new OverdueItemComponentsPage();
    expect(await overdueItemComponentsPage.title.getText()).to.match(/Overdue Items/);

    expect(await overdueItemComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([overdueItemComponentsPage.noRecords, overdueItemComponentsPage.table]);

    beforeRecordsCount = (await isVisible(overdueItemComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(overdueItemComponentsPage.table);
  });

  it('should load create OverdueItem page', async () => {
    await overdueItemComponentsPage.createButton.click();
    overdueItemUpdatePage = new OverdueItemUpdatePage();
    expect(await overdueItemUpdatePage.getPageTitle().getAttribute('id')).to.match(/gatewayApp.rentalOverdueItem.home.createOrEditLabel/);
    await overdueItemUpdatePage.cancel();
  });

  it('should create and save OverdueItems', async () => {
    await overdueItemComponentsPage.createButton.click();
    await overdueItemUpdatePage.setBookIdInput('5');
    expect(await overdueItemUpdatePage.getBookIdInput()).to.eq('5');
    await overdueItemUpdatePage.setDueDateInput('01-01-2001');
    expect(await overdueItemUpdatePage.getDueDateInput()).to.eq('2001-01-01');
    await overdueItemUpdatePage.setBookTitleInput('bookTitle');
    expect(await overdueItemUpdatePage.getBookTitleInput()).to.match(/bookTitle/);
    await overdueItemUpdatePage.rentalSelectLastOption();
    await waitUntilDisplayed(overdueItemUpdatePage.saveButton);
    await overdueItemUpdatePage.save();
    await waitUntilHidden(overdueItemUpdatePage.saveButton);
    expect(await isVisible(overdueItemUpdatePage.saveButton)).to.be.false;

    expect(await overdueItemComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(overdueItemComponentsPage.table);

    await waitUntilCount(overdueItemComponentsPage.records, beforeRecordsCount + 1);
    expect(await overdueItemComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last OverdueItem', async () => {
    const deleteButton = overdueItemComponentsPage.getDeleteButton(overdueItemComponentsPage.records.last());
    await click(deleteButton);

    overdueItemDeleteDialog = new OverdueItemDeleteDialog();
    await waitUntilDisplayed(overdueItemDeleteDialog.deleteModal);
    expect(await overdueItemDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gatewayApp.rentalOverdueItem.delete.question/);
    await overdueItemDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(overdueItemDeleteDialog.deleteModal);

    expect(await isVisible(overdueItemDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([overdueItemComponentsPage.noRecords, overdueItemComponentsPage.table]);

    const afterCount = (await isVisible(overdueItemComponentsPage.noRecords)) ? 0 : await getRecordsCount(overdueItemComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
