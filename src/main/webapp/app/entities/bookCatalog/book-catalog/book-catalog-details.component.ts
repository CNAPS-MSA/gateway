import { Component, Vue, Inject } from 'vue-property-decorator';

import { IBookCatalog } from '@/shared/model/bookCatalog/book-catalog.model';
import BookCatalogService from './book-catalog.service';

@Component
export default class BookCatalogDetails extends Vue {
  @Inject('bookCatalogService') private bookCatalogService: () => BookCatalogService;
  public bookCatalog: IBookCatalog = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.bookCatalogId) {
        vm.retrieveBookCatalog(to.params.bookCatalogId);
      }
    });
  }

  public retrieveBookCatalog(bookCatalogId) {
    this.bookCatalogService()
      .find(bookCatalogId)
      .then(res => {
        this.bookCatalog = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
