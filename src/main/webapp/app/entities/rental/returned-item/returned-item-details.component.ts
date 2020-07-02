import { Component, Vue, Inject } from 'vue-property-decorator';

import { IReturnedItem } from '@/shared/model/rental/returned-item.model';
import ReturnedItemService from './returned-item.service';

@Component
export default class ReturnedItemDetails extends Vue {
  @Inject('returnedItemService') private returnedItemService: () => ReturnedItemService;
  public returnedItem: IReturnedItem = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.returnedItemId) {
        vm.retrieveReturnedItem(to.params.returnedItemId);
      }
    });
  }

  public retrieveReturnedItem(returnedItemId) {
    this.returnedItemService()
      .find(returnedItemId)
      .then(res => {
        this.returnedItem = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
