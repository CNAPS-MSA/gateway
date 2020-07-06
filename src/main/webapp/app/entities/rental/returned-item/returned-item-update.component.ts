import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import RentalService from '../rental/rental.service';
import { IRental } from '@/shared/model/rental/rental.model';

import AlertService from '@/shared/alert/alert.service';
import { IReturnedItem, ReturnedItem } from '@/shared/model/rental/returned-item.model';
import ReturnedItemService from './returned-item.service';

const validations: any = {
  returnedItem: {
    bookId: {},
    returnedDate: {},
    bookTitle: {},
  },
};

@Component({
  validations,
})
export default class ReturnedItemUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('returnedItemService') private returnedItemService: () => ReturnedItemService;
  public returnedItem: IReturnedItem = new ReturnedItem();

  @Inject('rentalService') private rentalService: () => RentalService;

  public rentals: IRental[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.returnedItemId) {
        vm.retrieveReturnedItem(to.params.returnedItemId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.returnedItem.id) {
      this.returnedItemService()
        .update(this.returnedItem)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('gatewayApp.rentalReturnedItem.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.returnedItemService()
        .create(this.returnedItem)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('gatewayApp.rentalReturnedItem.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveReturnedItem(returnedItemId): void {
    this.returnedItemService()
      .find(returnedItemId)
      .then(res => {
        this.returnedItem = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.rentalService()
      .retrieve()
      .then(res => {
        this.rentals = res.data;
      });
  }
}
