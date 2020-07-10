import { Component, Inject, Vue } from 'vue-property-decorator';
import { IBookCatalog } from '@/shared/model/bookCatalog/book-catalog.model';
import BookRentalService from '@/cnaps/book-rental-service/book-rental.service';
@Component
export default class BookRentalDetails extends Vue {
  @Inject('bookRentalService') private bookRentalService: () => BookRentalService;
  public book: IBookCatalog = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.bookTitle) {
        vm.retrieveBookRental(to.params.bookTitle);
      }
    });
  }

  public retrieveBookRental(bookTitle) {
    this.bookRentalService()
      .findByTitle(bookTitle)
      .then(res => {
        this.book = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
