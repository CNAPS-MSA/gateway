import { Route } from '@angular/router';
import { BoardComponent } from 'app/board/board/board.component';

export const BOARD_ROUTE: Route = {
  path: '',
  component: BoardComponent,
  data: {
    authorities: [],
    pageTitle: 'Board Page'
  }
};
