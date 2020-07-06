import { Component, Vue, Inject } from 'vue-property-decorator';

import { IRentedItem } from '@/shared/model/rental/rented-item.model';
import RentedItemService from './rented-item.service';

@Component
export default class RentedItemDetails extends Vue {
  @Inject('rentedItemService') private rentedItemService: () => RentedItemService;
  public rentedItem: IRentedItem = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.rentedItemId) {
        vm.retrieveRentedItem(to.params.rentedItemId);
      }
    });
  }

  public retrieveRentedItem(rentedItemId) {
    this.rentedItemService()
      .find(rentedItemId)
      .then(res => {
        this.rentedItem = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
