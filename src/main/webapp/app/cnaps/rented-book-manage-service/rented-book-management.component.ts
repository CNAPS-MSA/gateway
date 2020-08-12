import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IRentedItem } from '@/shared/model/rental/rented-item.model';
import { IUser } from '@/shared/model/user.model';

import AlertMixin from '@/shared/alert/alert.mixin';
import RentedBookManagementService from '@/cnaps/rented-book-manage-service/rented-book-management.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class RentedBookManagement extends mixins(AlertMixin) {
  @Inject('rentedBookManagementService') private rentedBookManagementService: () => RentedBookManagementService;

  public itemsPerPage = 20;
  public queryCount: number = null;
  public page = 1;
  public previousPage = 1;
  public propOrder = 'id';
  public reverse = false;
  public totalItems = 0;
  public title = '';
  public books: IRentedItem[] = [];
  public users: IUser[] = [];
  public isFetching = false;
  public overdueRentalId: number = null;
  public overdueBookId: number = null;

  public mounted(): void {
    this.retrieveAllBooks();
  }

  public clear(): void {
    this.page = 1;
    this.retrieveAllBooks();
  }

  public retrieveAllBooks(): void {
    this.isFetching = true;

    const paginationQuery = {
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort(),
    };
    this.rentedBookManagementService()
      .retrieve(paginationQuery)
      .then(
        res => {
          this.books = res.data;
          this.totalItems = Number(res.headers['x-total-count']);
          this.queryCount = this.totalItems;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareOverdue(rentalId: number, bookId: number): void {
    this.overdueRentalId = rentalId;
    this.overdueBookId = bookId;
    if (<any>this.$refs.doOverdue) {
      (<any>this.$refs.doOverdue).show();
    }
  }

  public overdueBook(): void {
    this.rentedBookManagementService()
      .overdue(this.overdueRentalId, this.overdueBookId)
      .then(() => {
        const message = this.$t('gatewayApp.rentalRentedItem.doOverdue.completed');
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.overdueRentalId = null;
        this.overdueBookId = null;
        this.retrieveAllBooks();
        this.closeDialog();
      });
  }

  public sort(): Array<any> {
    const result = [this.propOrder + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.propOrder !== 'id') {
      result.push('id');
    }
    return result;
  }

  public loadPage(page: number): void {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  public transition(): void {
    this.retrieveAllBooks();
  }

  public changeOrder(propOrder): void {
    this.propOrder = propOrder;
    this.reverse = !this.reverse;
    this.transition();
  }

  public closeDialog(): void {
    (<any>this.$refs.doOverdue).hide();
  }

  public search(): void {
    this.isFetching = true;

    const paginationQuery = {
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort(),
    };
    this.rentedBookManagementService()
      .findByTitle(this.title, paginationQuery)
      .then(res => {
        this.books = res.data;
        this.title = '';
      });
  }
}
