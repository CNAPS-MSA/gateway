import { Component, Vue, Inject } from 'vue-property-decorator';

import { IInStockBook } from '@/shared/model/book/in-stock-book.model';
import InStockBookService from './in-stock-book.service';

@Component
export default class InStockBookDetails extends Vue {
  @Inject('inStockBookService') private inStockBookService: () => InStockBookService;
  public inStockBook: IInStockBook = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.inStockBookId) {
        vm.retrieveInStockBook(to.params.inStockBookId);
      }
    });
  }

  public retrieveInStockBook(inStockBookId) {
    this.inStockBookService()
      .find(inStockBookId)
      .then(res => {
        this.inStockBook = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
