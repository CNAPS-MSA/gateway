import { Component, Vue, Inject } from 'vue-property-decorator';

import { IOverdueItem } from '@/shared/model/rental/overdue-item.model';
import OverdueItemService from './overdue-item.service';

@Component
export default class OverdueItemDetails extends Vue {
  @Inject('overdueItemService') private overdueItemService: () => OverdueItemService;
  public overdueItem: IOverdueItem = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.overdueItemId) {
        vm.retrieveOverdueItem(to.params.overdueItemId);
      }
    });
  }

  public retrieveOverdueItem(overdueItemId) {
    this.overdueItemService()
      .find(overdueItemId)
      .then(res => {
        this.overdueItem = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
