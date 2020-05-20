import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import RentedItemComponentsPage, { RentedItemDeleteDialog } from './rented-item.page-object';
import RentedItemUpdatePage from './rented-item-update.page-object';
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

describe('RentedItem e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let rentedItemComponentsPage: RentedItemComponentsPage;
  let rentedItemUpdatePage: RentedItemUpdatePage;
  let rentedItemDeleteDialog: RentedItemDeleteDialog;
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

  it('should load RentedItems', async () => {
    await navBarPage.getEntityPage('rented-item');
    rentedItemComponentsPage = new RentedItemComponentsPage();
    expect(await rentedItemComponentsPage.title.getText()).to.match(/Rented Items/);

    expect(await rentedItemComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([rentedItemComponentsPage.noRecords, rentedItemComponentsPage.table]);

    beforeRecordsCount = (await isVisible(rentedItemComponentsPage.noRecords)) ? 0 : await getRecordsCount(rentedItemComponentsPage.table);
  });

  it('should load create RentedItem page', async () => {
    await rentedItemComponentsPage.createButton.click();
    rentedItemUpdatePage = new RentedItemUpdatePage();
    expect(await rentedItemUpdatePage.getPageTitle().getAttribute('id')).to.match(/gatewayApp.rentalRentedItem.home.createOrEditLabel/);
    await rentedItemUpdatePage.cancel();
  });

  it('should create and save RentedItems', async () => {
    await rentedItemComponentsPage.createButton.click();
    await rentedItemUpdatePage.setBookIdInput('5');
    expect(await rentedItemUpdatePage.getBookIdInput()).to.eq('5');
    await rentedItemUpdatePage.setRentedDateInput('01-01-2001');
    expect(await rentedItemUpdatePage.getRentedDateInput()).to.eq('2001-01-01');
    await rentedItemUpdatePage.setDueDateInput('01-01-2001');
    expect(await rentedItemUpdatePage.getDueDateInput()).to.eq('2001-01-01');
    await rentedItemUpdatePage.rentalSelectLastOption();
    await waitUntilDisplayed(rentedItemUpdatePage.saveButton);
    await rentedItemUpdatePage.save();
    await waitUntilHidden(rentedItemUpdatePage.saveButton);
    expect(await isVisible(rentedItemUpdatePage.saveButton)).to.be.false;

    expect(await rentedItemComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(rentedItemComponentsPage.table);

    await waitUntilCount(rentedItemComponentsPage.records, beforeRecordsCount + 1);
    expect(await rentedItemComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last RentedItem', async () => {
    const deleteButton = rentedItemComponentsPage.getDeleteButton(rentedItemComponentsPage.records.last());
    await click(deleteButton);

    rentedItemDeleteDialog = new RentedItemDeleteDialog();
    await waitUntilDisplayed(rentedItemDeleteDialog.deleteModal);
    expect(await rentedItemDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gatewayApp.rentalRentedItem.delete.question/);
    await rentedItemDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(rentedItemDeleteDialog.deleteModal);

    expect(await isVisible(rentedItemDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([rentedItemComponentsPage.noRecords, rentedItemComponentsPage.table]);

    const afterCount = (await isVisible(rentedItemComponentsPage.noRecords)) ? 0 : await getRecordsCount(rentedItemComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
