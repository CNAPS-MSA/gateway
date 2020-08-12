import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IInStockBook } from '@/shared/model/book/in-stock-book.model';
import { IBook } from '@/shared/model/book/book.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import BookRegisterService from '@/cnaps/book-register-service/book-register.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class BookRegister extends mixins(AlertMixin) {
  @Inject('bookRegisterService') private bookRegisterService: () => BookRegisterService;
  private removeId: number = null;
  public itemsPerPage = 20;
  public queryCount: number = null;
  public page = 1;
  public previousPage = 1;
  public propOrder = 'id';
  public reverse = false;
  public totalItems = 0;
  public title = '';
  public books: IBook[] = [];
  public instockBooks: IInStockBook[] = [];
  public isFetching = false;
  public selected = [];
  public userId: any = null;

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
    this.bookRegisterService()
      .retrieve(paginationQuery)
      .then(
        res => {
          this.instockBooks = res.data;
          this.totalItems = Number(res.headers['x-total-count']);
          this.queryCount = this.totalItems;
          this.isFetching = false;
        },
        err => {
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
    this.bookRegisterService()
      .findByTitle(this.title, paginationQuery)
      .then(res => {
        this.instockBooks = res.data;
        this.title = '';
        this.isFetching = false;
      });
  }
}
