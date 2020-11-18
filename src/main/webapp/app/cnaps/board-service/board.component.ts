import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import AlertMixin from '@/shared/alert/alert.mixin';

import BoardService from '@/cnaps/board-service/board.service';
import { IBoard } from '@/shared/model/board/board.model';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Board extends mixins(AlertMixin) {
  @Inject('boardService') private boardService: () => BoardService;
  public itemsPerPage = 20;
  public queryCount: number = null;
  public page = 1;
  public previousPage = 1;
  public propOrder = 'id';
  public reverse = false;
  public totalItems = 0;
  public title = '';
  public Board: IBoard;
  public boards: IBoard[] = [];
  public isFetching = false;
  public selected: IBoard = {};
  public userId: any = null;
  public categorySelect: any = {
    disabled: false,
    readonly: false,
    categorySelected: 'All',
    visible: true,
    options: [
      {
        value: 'All',
        text: '전체 보기',
      },
      {
        value: 'NORMAL',
        text: '일반 게시물',
      },
      {
        value: 'NOTICE',
        text: '공지사항',
      },
    ],
  };

  public mounted(): void {
    this.retrieveAllBoards();
  }

  public clear(): void {
    this.page = 1;
    this.retrieveAllBoards();
  }

  public retrieveAllBoards(): void {
    this.isFetching = true;

    const paginationQuery = {
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort(),
    };
    this.boardService()
      .retrieve(paginationQuery)
      .then(
        res => {
          this.boards = res.data;
          this.totalItems = Number(res.headers['x-total-count']);
          this.queryCount = this.totalItems;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  // public prepareRent(book: IBookCatalog): void {
  //   this.userId = this.getUserId;
  //   this.selected = book;
  //   if (<any>this.$refs.doRental) {
  //     (<any>this.$refs.doRental).show();
  //   }
  // }

  // public rentBooks(): void {
  //   this.bookRentalService()
  //     .rentBooks(this.userId, this.selected.bookId)
  //     .then(
  //       res => {
  //         const message = this.$t('gatewayApp.rentalRental.doRent.rented', { param: this.selected.title });
  //         this.alertService().showAlert(message, 'info');
  //         this.getAlertFromStore();
  //         this.selected = {};
  //         this.retrieveAllBooks();
  //         this.closeDialog();
  //         this.isFetching = false;
  //       },
  //       err => {
  //         const errorMessage = err.response.data.message;
  //         this.alertService().showAlert(errorMessage, 'danger');
  //         this.getAlertFromStore();
  //         this.selected = {};
  //         this.retrieveAllBooks();
  //         this.closeDialog();
  //         this.isFetching = false;
  //       }
  //     );
  // }
  public sort(): Array<any> {
    const result = [this.propOrder + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.propOrder !== 'id') {
      result.push('id');
    }
    return result;
  }

  public loadPage(page: number): void {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  public transition(): void {
    this.retrieveAllBoards();
  }

  public changeOrder(propOrder): void {
    this.propOrder = propOrder;
    this.reverse = !this.reverse;
    this.transition();
  }

  // public search(): void {
  //   this.isFetching = true;
  //
  //   const paginationQuery = {
  //     page: this.page - 1,
  //     size: this.itemsPerPage,
  //     sort: this.sort(),
  //   };
  //   this.bookRentalService()
  //     .findByTitle(this.title, paginationQuery)
  //     .then(res => {
  //       this.books = res.data;
  //       this.title = '';
  //       this.isFetching = false;
  //     });
  // }
  //
  // public get getUserId(): any {
  //   return this.$store.getters.account.id;
  // }

  public changeCategory(selected: any): void {
    this.categorySelect.categorySelected = selected;

    this.isFetching = true;

    const paginationQuery = {
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort(),
    };
    if (this.categorySelect.categorySelected === 'All') {
      this.retrieveAllBoards();
    } else {
      this.boardService()
        .findByCategory(this.categorySelect.categorySelected, paginationQuery)
        .then(res => {
          this.boards = res.data;
          this.isFetching = false;
        });
    }
  }
}
