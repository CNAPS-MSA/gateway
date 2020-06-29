import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board.component';
import { Router, RouterModule } from '@angular/router';
import { BOARD_ROUTE } from 'app/board/board/board.route';

@NgModule({
  declarations: [BoardComponent],
  imports: [RouterModule.forChild([BOARD_ROUTE])]
})
export class BoardModule {}
