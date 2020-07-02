import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';
import { IInStockBook, InStockBook } from '@/shared/model/book/in-stock-book.model';
import InStockBookService from './in-stock-book.service';

const validations: any = {
  inStockBook: {
    title: {},
    description: {},
    author: {},
    publisher: {},
    isbn: {},
    publicationDate: {},
    source: {},
  },
};

@Component({
  validations,
})
export default class InStockBookUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('inStockBookService') private inStockBookService: () => InStockBookService;
  public inStockBook: IInStockBook = new InStockBook();
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.inStockBookId) {
        vm.retrieveInStockBook(to.params.inStockBookId);
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
    if (this.inStockBook.id) {
      this.inStockBookService()
        .update(this.inStockBook)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('gatewayApp.bookInStockBook.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.inStockBookService()
        .create(this.inStockBook)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('gatewayApp.bookInStockBook.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveInStockBook(inStockBookId): void {
    this.inStockBookService()
      .find(inStockBookId)
      .then(res => {
        this.inStockBook = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {}
}
