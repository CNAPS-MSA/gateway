import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IRentedItem } from '@/shared/model/rental/rented-item.model';
import { IRental } from '@/shared/model/rental/rental.model';
import { IUser } from '@/shared/model/user.model';
import { IOverdueItem } from '@/shared/model/rental/overdue-item.model';
import { IReturnedItem } from '@/shared/model/rental/returned-item.model';
import { RentalStatus } from '@/shared/model/rental/rental.model';
import AlertMixin from '@/shared/alert/alert.mixin';
import RentedBookManagementService from '@/cnaps/rented-book-manage-service/rented-book-management.service';
import MypageService from '@/cnaps/mypage-service/mypage.service';
import MyPageService from '@/cnaps/mypage-service/mypage.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class MyPage extends mixins(AlertMixin) {
  @Inject('myPageService') private myPageService: () => MyPageService;
  // private removeId: number = null;
  public itemsPerPage = 20;
  public queryCount: number = null;
  public page = 1;
  public previousPage = 1;
  public propOrder = 'id';
  public reverse = false;
  public totalItems = 0;
  public title = '';
  public rentedBooks: IRentedItem[] = [];
  public overdueBooks: IOverdueItem[] = [];
  public returnedBooks: IReturnedItem[] = [];
  public users: IUser[] = [];
  public isFetching = false;
  public user: IUser;
  public rental: IRental;
  public created(): void {
    this.loadRentalInfo();
  }
  public mounted(): void {
    this.retrieveRentedBooks();
    this.retrieveOverdueBooks();
    this.retrieveReturnedBooks();
  }

  public loadRentalInfo(): void {
    this.user = this.$store.getters.account;
    this.myPageService()
      .retrieveRental(this.user.id)
      .then(res => {
        this.rental = res;
      });
  }

  public clear(): void {
    this.page = 1;
    this.retrieveRentedBooks();
    this.retrieveOverdueBooks();
    this.retrieveReturnedBooks();
  }

  public retrieveRentedBooks(): void {
    this.isFetching = true;

    const paginationQuery = {
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort(),
    };
    this.myPageService()
      .retrieveRented(this.rental.id, paginationQuery)
      .then(
        res => {
          this.rentedBooks = res.data;
          this.totalItems = Number(res.headers['x-total-count']);
          this.queryCount = this.totalItems;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }
  public retrieveOverdueBooks(): void {
    this.isFetching = true;

    const paginationQuery = {
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort(),
    };
    this.myPageService()
      .retrieveOverdue(this.rental.id, paginationQuery)
      .then(
        res => {
          this.overdueBooks = res.data;
          this.totalItems = Number(res.headers['x-total-count']);
          this.queryCount = this.totalItems;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }
  public retrieveReturnedBooks(): void {
    this.isFetching = true;

    const paginationQuery = {
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort(),
    };
    this.myPageService()
      .retrieveReturned(this.rental.id, paginationQuery)
      .then(
        res => {
          this.returnedBooks = res.data;
          this.totalItems = Number(res.headers['x-total-count']);
          this.queryCount = this.totalItems;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }
  public prepareReleaseOverdue(instance: IRental): void {
    if (<any>this.$refs.releaseOverdue) {
      (<any>this.$refs.releaseOVerdue).show();
    }
  }
  //
  public releaseOverdue(): void {
    this.myPageService()
      .releaseOverdue(this.user.id)
      .then(() => {
        const message = this.$t('gatewayApp.rentalRental.result');
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.loadRentalInfo();
        this.closeOverdueDialog();
      });
  }

  //
  // public overdueBook(): void {
  //   this.rentedBookManagementService()
  //     .overdue(this.overdueRentalId, this.overdueBookId)
  //     .then(() => {
  //       const message = this.$t('gatewayApp.rentalRentedItem.doOverdue.completed');
  //       this.alertService().showAlert(message, 'danger');
  //       this.getAlertFromStore();
  //       this.overdueRentalId = null;
  //       this.overdueBookId = null;
  //       this.retrieveAllBooks();
  //       this.closeDialog();
  //     });
  // }

  public sort(): Array<any> {
    const result = [this.propOrder + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.propOrder !== 'id') {
      result.push('id');
    }
    return result;
  }
  //
  // public loadPage(page: number): void {
  //   if (page !== this.previousPage) {
  //     this.previousPage = page;
  //     this.transition();
  //   }
  // }
  // //
  // // public transition(): void {
  // //   this.retrieveAllBooks();
  // // }
  //
  // public changeOrder(propOrder): void {
  //   this.propOrder = propOrder;
  //   this.reverse = !this.reverse;
  //   this.transition();
  // }

  public closeOverdueDialog(): void {
    (<any>this.$refs.releaseOverdue).hide();
  }
  //
  // public search(): void {
  //   this.isFetching = true;
  //
  //   const paginationQuery = {
  //     page: this.page - 1,
  //     size: this.itemsPerPage,
  //     sort: this.sort(),
  //   };
  //   this.rentedBookManagementService()
  //     .findByTitle(this.title, paginationQuery)
  //     .then(res => {
  //       this.books = res.data;
  //       this.title = '';
  //     });
  // }

  public get getUserId(): any {
    return this.$store.getters.account;
  }
}
