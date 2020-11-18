import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';
import { Board, IBoard } from '@/shared/model/board/board.model';
import BoardService from '@/cnaps/board-service/board.service';
import { IComment, Comment } from '@/shared/model/board/comment.model';

const validations: any = {
  comment: {
    content: { required },
  },
};

@Component({
  validations,
})
export default class BoardDetailsComponent extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('boardService') private boardService: () => BoardService;
  public itemsPerPage = 10;
  public queryCount: number = null;
  public page = 1;
  public previousPage = 1;
  public totalItems = 0;
  public board: IBoard = {};
  public commentList: IComment[] = [];
  public comment: IComment = new Comment();
  public isSaving = false;
  public isFetching = false;
  public currentLanguage = '';
  public userId: any = null;
  public removeId: any = null;
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.boardId) {
        vm.retrieveBoard(to.params.boardId);
        vm.retrieveComments(to.params.boardId);
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

  public retrieveBoard(boardId): void {
    this.boardService()
      .find(boardId)
      .then(res => {
        this.board = res;
        this.userId = this.$store.getters.account.id;
      });
  }

  public retrieveComments(boardId): void {
    this.isFetching = true;

    const paginationQuery = {
      page: this.page - 1,
      size: this.itemsPerPage,
    };
    this.boardService()
      .retrieveAllComments(paginationQuery, boardId)
      .then(
        res => {
          this.commentList = res.data;
          this.totalItems = Number(res.headers['x-total-count']);
          this.queryCount = this.totalItems;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IBoard): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }
  public deleteBoard(boardId: number): void {
    this.boardService()
      .delete(boardId)
      .then(() => {
        this.closeDialog();
        this.$router.go(-1);
        const message = this.$t('gatewayApp.boardBoard.deleted');
        this.alertService().showAlert(message, 'danger');
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
