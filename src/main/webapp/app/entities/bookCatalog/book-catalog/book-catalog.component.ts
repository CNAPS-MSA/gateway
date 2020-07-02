import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IBookCatalog } from '@/shared/model/bookCatalog/book-catalog.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import BookCatalogService from './book-catalog.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class BookCatalog extends mixins(AlertMixin) {
  @Inject('bookCatalogService') private bookCatalogService: () => BookCatalogService;
  private removeId: string = null;
  public itemsPerPage = 20;
  public queryCount: number = null;
  public page = 1;
  public previousPage = 1;
  public propOrder = 'id';
  public reverse = false;
  public totalItems = 0;

  public bookCatalogs: IBookCatalog[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllBookCatalogs();
  }

  public clear(): void {
    this.page = 1;
    this.retrieveAllBookCatalogs();
  }

  public retrieveAllBookCatalogs(): void {
    this.isFetching = true;

    const paginationQuery = {
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort(),
    };
    this.bookCatalogService()
      .retrieve(paginationQuery)
      .then(
        res => {
          this.bookCatalogs = res.data;
          this.totalItems = Number(res.headers['x-total-count']);
          this.queryCount = this.totalItems;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IBookCatalog): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeBookCatalog(): void {
    this.bookCatalogService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('gatewayApp.bookCatalogBookCatalog.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllBookCatalogs();
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
    this.retrieveAllBookCatalogs();
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
