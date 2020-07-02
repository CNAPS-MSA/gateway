import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IReturnedItem } from '@/shared/model/rental/returned-item.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import ReturnedItemService from './returned-item.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class ReturnedItem extends mixins(AlertMixin) {
  @Inject('returnedItemService') private returnedItemService: () => ReturnedItemService;
  private removeId: number = null;
  public itemsPerPage = 20;
  public queryCount: number = null;
  public page = 1;
  public previousPage = 1;
  public propOrder = 'id';
  public reverse = false;
  public totalItems = 0;

  public returnedItems: IReturnedItem[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllReturnedItems();
  }

  public clear(): void {
    this.page = 1;
    this.retrieveAllReturnedItems();
  }

  public retrieveAllReturnedItems(): void {
    this.isFetching = true;

    const paginationQuery = {
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort(),
    };
    this.returnedItemService()
      .retrieve(paginationQuery)
      .then(
        res => {
          this.returnedItems = res.data;
          this.totalItems = Number(res.headers['x-total-count']);
          this.queryCount = this.totalItems;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IReturnedItem): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeReturnedItem(): void {
    this.returnedItemService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('gatewayApp.rentalReturnedItem.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllReturnedItems();
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
    this.retrieveAllReturnedItems();
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
