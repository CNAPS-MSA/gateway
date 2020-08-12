import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IRentedItem } from '@/shared/model/rental/rented-item.model';
import { IRental } from '@/shared/model/rental/rental.model';
import { IOverdueItem } from '@/shared/model/rental/overdue-item.model';
import { IReturnedItem } from '@/shared/model/rental/returned-item.model';
import AlertMixin from '@/shared/alert/alert.mixin';
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
  public isFetching = false;
  public user: any = null;
  public rental: IRental = null;
  public rentedBooks: IRentedItem[] = [];
  public overdueBooks: IOverdueItem[] = [];
  public returnedBooks: IReturnedItem[] = [];
  public requestReturnId: number = null;
  public created(): void {}

  public mounted(): void {
    this.getUser();
  }

  public loadRentalInfo(): void {
    this.myPageService()
      .retrieveRental(this.user.id)
      .then(res => {
        this.rental = res;
        this.retrieveRentedBooks();
        this.retrieveOverdueBooks();
        this.retrieveReturnedBooks();
        this.isFetching = false;
      });
  }

  public clear(): void {
    this.page = 1;
    this.loadRentalInfo();
  }

  public prepareReleaseOverdue(): void {
    if (<any>this.$refs.releaseOverdue) {
      (<any>this.$refs.releaseOverdue).show();
    }
  }
  //
  public releaseOverdue(): void {
    this.myPageService()
      .releaseOverdue(this.user.id)
      .then(
        res => {
          const message = this.$t('gatewayApp.rentalRental.releaseOverdue.result');
          this.alertService().showAlert(message, 'danger');
          this.getAlertFromStore();
          this.getAlertFromStore();
          this.getUser();
          this.closeOverdueDialog();
        },
        err => {
          const errorMessage = err.response.data.message;
          this.alertService().showAlert(errorMessage, 'danger');
          this.getAlertFromStore();
          this.getUser();
          this.closeOverdueDialog();
          this.isFetching = false;
        }
      );
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
    this.getUser();
  }

  public closeOverdueDialog(): void {
    (<any>this.$refs.releaseOverdue).hide();
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
  public prepareReturn(requestReturnBook: number): void {
    this.requestReturnId = requestReturnBook;
    if (<any>this.$refs.returnBook) {
      (<any>this.$refs.returnBook).show();
    }
  }
  public returnBook(): void {
    this.myPageService()
      .requestReturn(this.user.id, this.requestReturnId)
      .then(() => {
        const message = this.$t('global.menu.mypage.returnBook.result');
        this.requestReturnId = null;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.getUser();
        this.closeReturnDialog();
      });
  }

  public prepareOverdueReturn(requestReturnBook: number): void {
    this.requestReturnId = requestReturnBook;
    if (<any>this.$refs.returnOverdueBook) {
      (<any>this.$refs.returnOverdueBook).show();
    }
  }

  public returnOverdueBook(): void {
    this.myPageService()
      .requestOverdueReturn(this.user.id, this.requestReturnId)
      .then(() => {
        const message = this.$t('global.menu.mypage.returnBook.result');
        this.requestReturnId = null;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.getUser();
        this.closeOverdueReturnDialog();
      });
  }

  public closeReturnDialog(): void {
    (<any>this.$refs.returnBook).hide();
  }
  public closeOverdueReturnDialog(): void {
    (<any>this.$refs.returnOverdueBook).hide();
  }
  public getUser(): void {
    this.myPageService()
      .loadUserInfo(this.$store.getters.account.id)
      .then(res => {
        this.user = res;
        this.loadRentalInfo();
      });
  }
}
