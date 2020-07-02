import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import RentedItemService from '../rented-item/rented-item.service';
import { IRentedItem } from '@/shared/model/rental/rented-item.model';

import OverdueItemService from '../overdue-item/overdue-item.service';
import { IOverdueItem } from '@/shared/model/rental/overdue-item.model';

import ReturnedItemService from '../returned-item/returned-item.service';
import { IReturnedItem } from '@/shared/model/rental/returned-item.model';

import AlertService from '@/shared/alert/alert.service';
import { IRental, Rental } from '@/shared/model/rental/rental.model';
import RentalService from './rental.service';

const validations: any = {
  rental: {
    userId: {},
    rentalStatus: {},
    lateFee: {},
  },
};

@Component({
  validations,
})
export default class RentalUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('rentalService') private rentalService: () => RentalService;
  public rental: IRental = new Rental();

  @Inject('rentedItemService') private rentedItemService: () => RentedItemService;

  public rentedItems: IRentedItem[] = [];

  @Inject('overdueItemService') private overdueItemService: () => OverdueItemService;

  public overdueItems: IOverdueItem[] = [];

  @Inject('returnedItemService') private returnedItemService: () => ReturnedItemService;

  public returnedItems: IReturnedItem[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.rentalId) {
        vm.retrieveRental(to.params.rentalId);
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
    if (this.rental.id) {
      this.rentalService()
        .update(this.rental)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('gatewayApp.rentalRental.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.rentalService()
        .create(this.rental)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('gatewayApp.rentalRental.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveRental(rentalId): void {
    this.rentalService()
      .find(rentalId)
      .then(res => {
        this.rental = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.rentedItemService()
      .retrieve()
      .then(res => {
        this.rentedItems = res.data;
      });
    this.overdueItemService()
      .retrieve()
      .then(res => {
        this.overdueItems = res.data;
      });
    this.returnedItemService()
      .retrieve()
      .then(res => {
        this.returnedItems = res.data;
      });
  }
}
