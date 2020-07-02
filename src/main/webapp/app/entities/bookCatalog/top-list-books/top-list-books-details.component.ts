import { Component, Vue, Inject } from 'vue-property-decorator';

import { ITopListBooks } from '@/shared/model/bookCatalog/top-list-books.model';
import TopListBooksService from './top-list-books.service';

@Component
export default class TopListBooksDetails extends Vue {
  @Inject('topListBooksService') private topListBooksService: () => TopListBooksService;
  public topListBooks: ITopListBooks = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.topListBooksId) {
        vm.retrieveTopListBooks(to.params.topListBooksId);
      }
    });
  }

  public retrieveTopListBooks(topListBooksId) {
    this.topListBooksService()
      .find(topListBooksId)
      .then(res => {
        this.topListBooks = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
