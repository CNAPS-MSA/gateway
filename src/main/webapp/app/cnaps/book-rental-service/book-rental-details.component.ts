import { Component, Inject, Vue } from 'vue-property-decorator';
import { IBookCatalog } from '@/shared/model/bookCatalog/book-catalog.model';
import BookRentalService from '@/cnaps/book-rental-service/book-rental.service';
import { IRentedItem } from '@/shared/model/rental/rented-item.model';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class BookRentalDetails extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('bookRentalService') private bookRentalService: () => BookRentalService;
  public book: IBookCatalog = {};
  public userId: any = null;
  public selected: IBookCatalog = {};
  public isFetching = false;
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.bookId) {
        vm.retrieveBookRental(to.params.bookId);
      }
    });
  }

  public retrieveBookRental(bookId) {
    this.bookRentalService()
      .find(bookId)
      .then(res => {
        this.book = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }

  public prepareRent(rentBook: IBookCatalog): void {
    this.userId = this.getUserId;
    this.selected = rentBook;
    this.rentBooks();
  }
  public rentBooks(): void {
    this.bookRentalService()
      .rentBooks(this.userId, this.selected.bookId)
      .then(
        res => {
          const message = this.$t('gatewayApp.rentalRental.doRent.rented', { param: this.selected.title });
          this.alertService().showAlert(message, 'info');
          this.selected = {};
          this.retrieveBookRental(this.book.id);
        },
        err => {
          this.selected = {};
          this.isFetching = false;
        }
      );
  }
  public get getUserId(): any {
    return this.$store.getters.account.id;
  }
}
