import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';
import { IBook, Book } from '@/shared/model/book/book.model';
import { IInStockBook } from '@/shared/model/book/in-stock-book.model';
import BookRegisterService from '@/cnaps/book-register-service/book-register.service';

const validations: any = {
  book: {
    classification: {},
    bookStatus: {},
    location: {},
  },
};

@Component({
  validations,
})
export default class BookUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('bookRegisterService') private bookRegisterService: () => BookRegisterService;
  public book: IBook = new Book();
  public instock: IInStockBook = {};
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.inStockId) {
        vm.retrieveInStock(to.params.inStockId);
      }
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
    this.bookRegisterService()
      .create(this.book, this.instock.id)
      .then(param => {
        this.isSaving = false;
        this.$router.go(-1);
        const message = this.$t('gatewayApp.bookBook.created', { param: param.id });
        this.alertService().showAlert(message, 'success');
      });
  }

  public retrieveInStock(inStockId): void {
    this.bookRegisterService()
      .find(inStockId)
      .then(res => {
        this.instock = res;
        this.setDataOfBook(this.instock);
      });
  }

  private setDataOfBook(instock: IInStockBook) {
    this.book.title = instock.title;
    this.book.author = instock.author;
    this.book.isbn = instock.isbn;
    this.book.description = instock.description;
    this.book.publisher = instock.publisher;
    this.book.publicationDate = instock.publicationDate;
  }

  public previousState(): void {
    this.$router.go(-1);
  }
}
