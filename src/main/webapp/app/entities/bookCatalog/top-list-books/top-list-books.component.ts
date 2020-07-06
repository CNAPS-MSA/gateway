import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { ITopListBooks } from '@/shared/model/bookCatalog/top-list-books.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import TopListBooksService from './top-list-books.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class TopListBooks extends mixins(AlertMixin) {
  @Inject('topListBooksService') private topListBooksService: () => TopListBooksService;
  private removeId: string = null;
  public itemsPerPage = 20;
  public queryCount: number = null;
  public page = 1;
  public previousPage = 1;
  public propOrder = 'id';
  public reverse = false;
  public totalItems = 0;

  public topListBooks: ITopListBooks[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllTopListBookss();
  }

  public clear(): void {
    this.page = 1;
    this.retrieveAllTopListBookss();
  }

  public retrieveAllTopListBookss(): void {
    this.isFetching = true;

    const paginationQuery = {
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort(),
    };
    this.topListBooksService()
      .retrieve(paginationQuery)
      .then(
        res => {
          this.topListBooks = res.data;
          this.totalItems = Number(res.headers['x-total-count']);
          this.queryCount = this.totalItems;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: ITopListBooks): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeTopListBooks(): void {
    this.topListBooksService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('gatewayApp.bookCatalogTopListBooks.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllTopListBookss();
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
    this.retrieveAllTopListBookss();
  }

  public changeOrder(propOrder): void {
    this.propOrder = propOrder;
    this.reverse = !this.reverse;
    this.transition();
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
