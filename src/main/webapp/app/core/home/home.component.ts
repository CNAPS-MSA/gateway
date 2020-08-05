import Component from 'vue-class-component';
import { Inject, Vue } from 'vue-property-decorator';
import LoginService from '@/account/login.service';
import { IBookCatalog } from '@/shared/model/bookCatalog/book-catalog.model';
import BookRentalService from '@/cnaps/book-rental-service/book-rental.service';

@Component
export default class Home extends Vue {
  @Inject('loginService')
  private loginService: () => LoginService;
  @Inject('bookRentalService')
  private bookRentalService: () => BookRentalService;

  public books: IBookCatalog[] = [];
  public itemsPerPage = 20;
  public queryCount: number = null;
  public page = 1;
  public previousPage = 1;
  public propOrder = 'rentCnt';
  public reverse = false;
  public totalItems = 0;
  public isFetching = false;

  public mounted(): void {
    this.retrieveBooks();
  }
  public openLogin(): void {
    this.loginService().openLogin((<any>this).$root);
  }

  public get authenticated(): boolean {
    return this.$store.getters.authenticated;
  }

  public get username(): string {
    return this.$store.getters.account ? this.$store.getters.account.login : '';
  }

  public retrieveBooks(): void {
    this.isFetching = true;

    this.bookRentalService()
      .retrieveTop10()
      .then(
        res => {
          this.books = res.data;
          this.totalItems = Number(res.headers['x-total-count']);
          this.queryCount = this.totalItems;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public loadPage(page: number): void {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  public transition(): void {
    this.retrieveBooks();
  }
  public sort(): Array<any> {
    const result = [this.propOrder + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.propOrder !== 'rentCnt') {
      result.push('rentCnt');
    }
    return result;
  }
}
