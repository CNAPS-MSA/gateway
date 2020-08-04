import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IRental } from '@/shared/model/rental/rental.model';
import { IBookCatalog } from '@/shared/model/bookCatalog/book-catalog.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import BookRentalService from './book-rental.service';
import { IRentedItem } from '@/shared/model/rental/rented-item.model';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class BookRental extends mixins(AlertMixin) {
  @Inject('bookRentalService') private bookRentalService: () => BookRentalService;
  private removeId: number = null;
  public itemsPerPage = 20;
  public queryCount: number = null;
  public page = 1;
  public previousPage = 1;
  public propOrder = 'id';
  public reverse = false;
  public totalItems = 0;
  public title = '';
  public rental: IRental;
  public books: IBookCatalog[] = [];
  public rentedItems: IRentedItem[] = [];
  public isFetching = false;
  public selected = [];
  public selectAll = false;
  public userId: any = null;

  public select() {
    this.selected = [];
    if (!this.selectAll) {
      for (let i in this.books) {
        this.selected.push(this.books[i].bookId);
      }
    }
  }
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
    this.bookRentalService()
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

  // public prepareRemove(instance: IRental): void {
  //   this.removeId = instance.id;
  //   if (<any>this.$refs.removeEntity) {
  //     (<any>this.$refs.removeEntity).show();
  //   }
  // }
  //
  // public removeRental(): void {
  //   this.bookRentalService()
  //     .delete(this.removeId)
  //     .then(() => {
  //       const message = this.$t('gatewayApp.rentalRental.deleted', { param: this.removeId });
  //       this.alertService().showAlert(message, 'danger');
  //       this.getAlertFromStore();
  //       this.removeId = null;
  //       this.retrieveAllRentals();
  //       this.closeDialog();
  //     });
  // }
  public prepareRent(): void {
    this.userId = this.getUserId;
    if (<any>this.$refs.doRental) {
      (<any>this.$refs.doRental).show();
    }
  }

  public rentBooks(): void {
    this.bookRentalService()
      .rentBooks(this.userId, this.selected)
      .then(
        res => {
          this.rentedItems = res.data;
          let resultItems = [];
          this.rentedItems.forEach(i => {
            resultItems.push(i.bookTitle);
          });
          const message = this.$t('gatewayApp.rentalRental.doRent.rented', { param: resultItems });
          this.alertService().showAlert(message, 'danger');
          this.getAlertFromStore();
          this.selected = [];
          this.retrieveAllBooks();
          this.closeDialog();
        },
        err => {
          this.selected = [];
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
    this.retrieveAllBooks();
  }

  public changeOrder(propOrder): void {
    this.propOrder = propOrder;
    this.reverse = !this.reverse;
    this.transition();
  }

  public closeDialog(): void {
    (<any>this.$refs.doRental).hide();
  }

  public search(): void {
    this.isFetching = true;

    const paginationQuery = {
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort(),
    };
    this.bookRentalService()
      .findByTitle(this.title, paginationQuery)
      .then(res => {
        this.books = res.data;
        this.title = '';
        this.isFetching = false;
      });
  }

  public get getUserId(): any {
    return this.$store.getters.account.id;
  }
}
