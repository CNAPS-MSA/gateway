import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';
import { Board, IBoard } from '@/shared/model/board/board.model';
import BoardService from '@/cnaps/board-service/board.service';
import { IComment, Comment } from '@/shared/model/board/comment.model';
import Vue2Filters from 'vue2-filters';
import { mixins } from 'vue-class-component';
import AlertMixin from '@/shared/alert/alert.mixin';

const validations: any = {
  comment: {
    content: { required },
  },
  editedComment: {
    content: { required },
  },
};

@Component({
  validations,
  mixins: [Vue2Filters.mixin],
})
export default class BoardDetailsComponent extends mixins(AlertMixin) {
  //@Inject('alertService') private alertService: () => AlertService;
  @Inject('boardService') private boardService: () => BoardService;
  public itemsPerPage = 10;
  public queryCount: number = null;
  public page = 1;
  public previousPage = 1;
  public totalItems = 0;
  public board: IBoard = {};
  public commentList: IComment[] = [];
  public comment: IComment = new Comment();
  public editedComment: IComment = new Comment();
  public isSaving = false;
  public isFetching = false;
  public currentLanguage = '';
  public userId: any = null;
  public userName: any = null;
  public removeId: any = null;
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.boardId) {
        vm.retrieveBoard(to.params.boardId);
        //  vm.retrieveComments(to.params.boardId);
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
    this.userId = this.$store.getters.account.id;
    this.userName = this.$store.getters.account.login;

    this.boardService()
      .find(boardId)
      .then(res => {
        this.board = res;
        this.retrieveComments(boardId);
      });
  }

  public retrieveComments(boardId): void {
    this.boardService()
      .retrieveAllComments(boardId)
      .then(
        res => {
          this.commentList = res.data;
        },
        err => {}
      );
  }

  public prepareRemove(instance: IBoard): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public prepareRemoveComment(instance: number): void {
    this.editedComment.id = instance;
    if (<any>this.$refs.deleteComment) {
      (<any>this.$refs.deleteComment).show();
    }
  }
  public prepareEditComment(contentInstance: string, idInstance: number): void {
    this.editedComment.content = contentInstance;
    this.editedComment.id = idInstance;
    if (<any>this.$refs.editComment) {
      (<any>this.$refs.editComment).show();
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
  public deleteComment(): void {
    this.boardService()
      .deleteComment(this.editedComment.id)
      .then(() => {
        this.closeCommentDeleteDialog();
        this.retrieveComments(this.board.id);
        const message = this.$t('gatewayApp.boardBoard.commentDeleted');
        this.alertService().showAlert(message, 'danger');
      });
  }

  public editComment(): void {
    this.isSaving = true;
    this.editedComment.writerName = this.userName;
    this.editedComment.writerId = this.userId;
    this.editedComment.boardId = this.board.id;
    this.boardService()
      .editComment(this.editedComment)
      .then(param => {
        this.closeCommentEditDialog();
        this.isSaving = false;
        this.retrieveComments(this.board.id);
        const message = this.$t('gatewayApp.boardBoard.commentEdited');
        this.alertService().showAlert(message, 'success');
      });
  }

  public save(): void {
    this.isSaving = true;
    this.comment.writerId = this.userId;
    this.comment.writerName = this.userName;
    this.comment.boardId = this.board.id;
    this.boardService()
      .registerComment(this.comment)
      .then(param => {
        this.isSaving = false;
        this.comment = new Comment();
        this.retrieveComments(this.board.id);
        const message = this.$t('gatewayApp.boardBoard.commentCreated');
        this.alertService().showAlert(message, 'success');
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
  public closeCommentDeleteDialog(): void {
    this.editedComment = new Comment();
    (<any>this.$refs.deleteComment).hide();
  }
  public closeCommentEditDialog(): void {
    this.editedComment = new Comment();
    (<any>this.$refs.editComment).hide();
  }

  public setUserData(boardId): void {
    this.userId = this.$store.getters.account.id;
    this.userName = this.$store.getters.account.login;
    this.retrieveBoard(boardId);
  }

  public checkWriterIdentity(writerId: number): boolean {
    return this.userId === writerId;
  }
}
