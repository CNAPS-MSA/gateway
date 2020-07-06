import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';
import { ITopListBooks, TopListBooks } from '@/shared/model/bookCatalog/top-list-books.model';
import TopListBooksService from './top-list-books.service';

const validations: any = {
  topListBooks: {
    title: {},
    description: {},
    author: {},
    publisher: {},
  },
};

@Component({
  validations,
})
export default class TopListBooksUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('topListBooksService') private topListBooksService: () => TopListBooksService;
  public topListBooks: ITopListBooks = new TopListBooks();
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.topListBooksId) {
        vm.retrieveTopListBooks(to.params.topListBooksId);
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
    if (this.topListBooks.id) {
      this.topListBooksService()
        .update(this.topListBooks)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('gatewayApp.bookCatalogTopListBooks.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.topListBooksService()
        .create(this.topListBooks)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('gatewayApp.bookCatalogTopListBooks.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveTopListBooks(topListBooksId): void {
    this.topListBooksService()
      .find(topListBooksId)
      .then(res => {
        this.topListBooks = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {}
}
