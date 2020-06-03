import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import RentalComponentsPage, { RentalDeleteDialog } from './rental.page-object';
import RentalUpdatePage from './rental-update.page-object';
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

describe('Rental e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let rentalComponentsPage: RentalComponentsPage;
  let rentalUpdatePage: RentalUpdatePage;
  let rentalDeleteDialog: RentalDeleteDialog;
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

  it('should load Rentals', async () => {
    await navBarPage.getEntityPage('rental');
    rentalComponentsPage = new RentalComponentsPage();
    expect(await rentalComponentsPage.title.getText()).to.match(/Rentals/);

    expect(await rentalComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([rentalComponentsPage.noRecords, rentalComponentsPage.table]);

    beforeRecordsCount = (await isVisible(rentalComponentsPage.noRecords)) ? 0 : await getRecordsCount(rentalComponentsPage.table);
  });

  it('should load create Rental page', async () => {
    await rentalComponentsPage.createButton.click();
    rentalUpdatePage = new RentalUpdatePage();
    expect(await rentalUpdatePage.getPageTitle().getAttribute('id')).to.match(/gatewayApp.rentalRental.home.createOrEditLabel/);
    await rentalUpdatePage.cancel();
  });

  it('should create and save Rentals', async () => {
    await rentalComponentsPage.createButton.click();
    await rentalUpdatePage.setUserIdInput('5');
    expect(await rentalUpdatePage.getUserIdInput()).to.eq('5');
    await rentalUpdatePage.setLateFeeInput('5');
    expect(await rentalUpdatePage.getLateFeeInput()).to.eq('5');
    await rentalUpdatePage.rentalStatusSelectLastOption();
    await waitUntilDisplayed(rentalUpdatePage.saveButton);
    await rentalUpdatePage.save();
    await waitUntilHidden(rentalUpdatePage.saveButton);
    expect(await isVisible(rentalUpdatePage.saveButton)).to.be.false;

    expect(await rentalComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(rentalComponentsPage.table);

    await waitUntilCount(rentalComponentsPage.records, beforeRecordsCount + 1);
    expect(await rentalComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Rental', async () => {
    const deleteButton = rentalComponentsPage.getDeleteButton(rentalComponentsPage.records.last());
    await click(deleteButton);

    rentalDeleteDialog = new RentalDeleteDialog();
    await waitUntilDisplayed(rentalDeleteDialog.deleteModal);
    expect(await rentalDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gatewayApp.rentalRental.delete.question/);
    await rentalDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(rentalDeleteDialog.deleteModal);

    expect(await isVisible(rentalDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([rentalComponentsPage.noRecords, rentalComponentsPage.table]);

    const afterCount = (await isVisible(rentalComponentsPage.noRecords)) ? 0 : await getRecordsCount(rentalComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
