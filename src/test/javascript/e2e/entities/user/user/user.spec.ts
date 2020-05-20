import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import UserComponentsPage, { UserDeleteDialog } from './user.page-object';
import UserUpdatePage from './user-update.page-object';
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

describe('User e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let userComponentsPage: UserComponentsPage;
  let userUpdatePage: UserUpdatePage;
  let userDeleteDialog: UserDeleteDialog;
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

  it('should load Users', async () => {
    await navBarPage.getEntityPage('user');
    userComponentsPage = new UserComponentsPage();
    expect(await userComponentsPage.title.getText()).to.match(/Users/);

    expect(await userComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([userComponentsPage.noRecords, userComponentsPage.table]);

    beforeRecordsCount = (await isVisible(userComponentsPage.noRecords)) ? 0 : await getRecordsCount(userComponentsPage.table);
  });

  it('should load create User page', async () => {
    await userComponentsPage.createButton.click();
    userUpdatePage = new UserUpdatePage();
    expect(await userUpdatePage.getPageTitle().getAttribute('id')).to.match(/gatewayApp.userUser.home.createOrEditLabel/);
    await userUpdatePage.cancel();
  });

  it('should create and save Users', async () => {
    await userComponentsPage.createButton.click();
    await userUpdatePage.setNameInput('name');
    expect(await userUpdatePage.getNameInput()).to.match(/name/);
    await userUpdatePage.setEmailInput('email');
    expect(await userUpdatePage.getEmailInput()).to.match(/email/);
    await waitUntilDisplayed(userUpdatePage.saveButton);
    await userUpdatePage.save();
    await waitUntilHidden(userUpdatePage.saveButton);
    expect(await isVisible(userUpdatePage.saveButton)).to.be.false;

    expect(await userComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(userComponentsPage.table);

    await waitUntilCount(userComponentsPage.records, beforeRecordsCount + 1);
    expect(await userComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last User', async () => {
    const deleteButton = userComponentsPage.getDeleteButton(userComponentsPage.records.last());
    await click(deleteButton);

    userDeleteDialog = new UserDeleteDialog();
    await waitUntilDisplayed(userDeleteDialog.deleteModal);
    expect(await userDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gatewayApp.userUser.delete.question/);
    await userDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(userDeleteDialog.deleteModal);

    expect(await isVisible(userDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([userComponentsPage.noRecords, userComponentsPage.table]);

    const afterCount = (await isVisible(userComponentsPage.noRecords)) ? 0 : await getRecordsCount(userComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
