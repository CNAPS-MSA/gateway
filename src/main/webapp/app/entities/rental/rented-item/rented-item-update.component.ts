import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import RentalService from '../rental/rental.service';
import { IRental } from '@/shared/model/rental/rental.model';

import AlertService from '@/shared/alert/alert.service';
import { IRentedItem, RentedItem } from '@/shared/model/rental/rented-item.model';
import RentedItemService from './rented-item.service';

const validations: any = {
  rentedItem: {
    bookId: {},
    rentedDate: {},
    dueDate: {},
    bookTitle: {},
  },
};

@Component({
  validations,
})
export default class RentedItemUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('rentedItemService') private rentedItemService: () => RentedItemService;
  public rentedItem: IRentedItem = new RentedItem();

  @Inject('rentalService') private rentalService: () => RentalService;

  public rentals: IRental[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.rentedItemId) {
        vm.retrieveRentedItem(to.params.rentedItemId);
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
    if (this.rentedItem.id) {
      this.rentedItemService()
        .update(this.rentedItem)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('gatewayApp.rentalRentedItem.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.rentedItemService()
        .create(this.rentedItem)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('gatewayApp.rentalRentedItem.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveRentedItem(rentedItemId): void {
    this.rentedItemService()
      .find(rentedItemId)
      .then(res => {
        this.rentedItem = res;
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
