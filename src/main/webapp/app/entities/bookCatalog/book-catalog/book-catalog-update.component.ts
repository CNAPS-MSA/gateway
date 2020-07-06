import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';
import { IBookCatalog, BookCatalog } from '@/shared/model/bookCatalog/book-catalog.model';
import BookCatalogService from './book-catalog.service';

const validations: any = {
  bookCatalog: {
    title: {},
    description: {},
    author: {},
    publicationDate: {},
    classification: {},
    rented: {},
    rentCnt: {},
    bookId: {},
  },
};

@Component({
  validations,
})
export default class BookCatalogUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('bookCatalogService') private bookCatalogService: () => BookCatalogService;
  public bookCatalog: IBookCatalog = new BookCatalog();
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.bookCatalogId) {
        vm.retrieveBookCatalog(to.params.bookCatalogId);
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
    if (this.bookCatalog.id) {
      this.bookCatalogService()
        .update(this.bookCatalog)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('gatewayApp.bookCatalogBookCatalog.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.bookCatalogService()
        .create(this.bookCatalog)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('gatewayApp.bookCatalogBookCatalog.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveBookCatalog(bookCatalogId): void {
    this.bookCatalogService()
      .find(bookCatalogId)
      .then(res => {
        this.bookCatalog = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {}
}
