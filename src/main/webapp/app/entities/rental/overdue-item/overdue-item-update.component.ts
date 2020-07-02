import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import RentalService from '../rental/rental.service';
import { IRental } from '@/shared/model/rental/rental.model';

import AlertService from '@/shared/alert/alert.service';
import { IOverdueItem, OverdueItem } from '@/shared/model/rental/overdue-item.model';
import OverdueItemService from './overdue-item.service';

const validations: any = {
  overdueItem: {
    bookId: {},
    dueDate: {},
    bookTitle: {},
  },
};

@Component({
  validations,
})
export default class OverdueItemUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('overdueItemService') private overdueItemService: () => OverdueItemService;
  public overdueItem: IOverdueItem = new OverdueItem();

  @Inject('rentalService') private rentalService: () => RentalService;

  public rentals: IRental[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.overdueItemId) {
        vm.retrieveOverdueItem(to.params.overdueItemId);
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
    if (this.overdueItem.id) {
      this.overdueItemService()
        .update(this.overdueItem)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('gatewayApp.rentalOverdueItem.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.overdueItemService()
        .create(this.overdueItem)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('gatewayApp.rentalOverdueItem.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveOverdueItem(overdueItemId): void {
    this.overdueItemService()
      .find(overdueItemId)
      .then(res => {
        this.overdueItem = res;
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
