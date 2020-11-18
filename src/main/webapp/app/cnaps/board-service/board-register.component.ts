import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';
import { Board, IBoard } from '@/shared/model/board/board.model';
import BoardService from '@/cnaps/board-service/board.service';

const validations: any = {
  board: {
    title: { required },
    content: { required },
    category: { required },
  },
};

@Component({
  validations,
})
export default class BoardRegister extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('boardService') private boardService: () => BoardService;
  public board: IBoard = new Board();
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.boardId) {
        vm.retrieveBoard(to.params.boardId);
      } else {
        vm.setUserDataOfBoard();
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

  private setUserDataOfBoard() {
    this.board.writerId = this.$store.getters.account.id;
    this.board.writerName = this.$store.getters.account.login;
  }
  public retrieveBoard(boardId): void {
    this.boardService()
      .find(boardId)
      .then(res => {
        this.board = res;
      });
  }
  public save(): void {
    this.isSaving = true;
    // this.boardService()
    //   .register(this.board)
    //   .then(param => {
    //     this.isSaving = false;
    //     this.$router.go(-1);
    //     const message = this.$t('gatewayApp.boardBoard.created');
    //     this.alertService().showAlert(message, 'success');
    //   });

    if (this.board.id) {
      this.boardService()
        .update(this.board)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('gatewayApp.boardBoard.updated');
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.boardService()
        .register(this.board)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('gatewayApp.boardBoard.created');
          this.alertService().showAlert(message, 'success');
        });
    }
  }
  public previousState(): void {
    this.$router.go(-1);
  }
}
