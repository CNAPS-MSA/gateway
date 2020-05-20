import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import ReturnedItemComponentsPage, { ReturnedItemDeleteDialog } from './returned-item.page-object';
import ReturnedItemUpdatePage from './returned-item-update.page-object';
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

describe('ReturnedItem e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let returnedItemComponentsPage: ReturnedItemComponentsPage;
  let returnedItemUpdatePage: ReturnedItemUpdatePage;
  let returnedItemDeleteDialog: ReturnedItemDeleteDialog;
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

  it('should load ReturnedItems', async () => {
    await navBarPage.getEntityPage('returned-item');
    returnedItemComponentsPage = new ReturnedItemComponentsPage();
    expect(await returnedItemComponentsPage.title.getText()).to.match(/Returned Items/);

    expect(await returnedItemComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([returnedItemComponentsPage.noRecords, returnedItemComponentsPage.table]);

    beforeRecordsCount = (await isVisible(returnedItemComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(returnedItemComponentsPage.table);
  });

  it('should load create ReturnedItem page', async () => {
    await returnedItemComponentsPage.createButton.click();
    returnedItemUpdatePage = new ReturnedItemUpdatePage();
    expect(await returnedItemUpdatePage.getPageTitle().getAttribute('id')).to.match(/gatewayApp.rentalReturnedItem.home.createOrEditLabel/);
    await returnedItemUpdatePage.cancel();
  });

  it('should create and save ReturnedItems', async () => {
    await returnedItemComponentsPage.createButton.click();
    await returnedItemUpdatePage.setBookIdInput('5');
    expect(await returnedItemUpdatePage.getBookIdInput()).to.eq('5');
    await returnedItemUpdatePage.setReturnedDateInput('01-01-2001');
    expect(await returnedItemUpdatePage.getReturnedDateInput()).to.eq('2001-01-01');
    await returnedItemUpdatePage.rentalSelectLastOption();
    await waitUntilDisplayed(returnedItemUpdatePage.saveButton);
    await returnedItemUpdatePage.save();
    await waitUntilHidden(returnedItemUpdatePage.saveButton);
    expect(await isVisible(returnedItemUpdatePage.saveButton)).to.be.false;

    expect(await returnedItemComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(returnedItemComponentsPage.table);

    await waitUntilCount(returnedItemComponentsPage.records, beforeRecordsCount + 1);
    expect(await returnedItemComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last ReturnedItem', async () => {
    const deleteButton = returnedItemComponentsPage.getDeleteButton(returnedItemComponentsPage.records.last());
    await click(deleteButton);

    returnedItemDeleteDialog = new ReturnedItemDeleteDialog();
    await waitUntilDisplayed(returnedItemDeleteDialog.deleteModal);
    expect(await returnedItemDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gatewayApp.rentalReturnedItem.delete.question/);
    await returnedItemDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(returnedItemDeleteDialog.deleteModal);

    expect(await isVisible(returnedItemDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([returnedItemComponentsPage.noRecords, returnedItemComponentsPage.table]);

    const afterCount = (await isVisible(returnedItemComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(returnedItemComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
