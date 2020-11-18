export const enum Category {
  Notice = 'NOTICE',
  Normal = 'NORMAL',
}

export interface IBoard {
  id?: number;
  title?: string;
  content?: string;
  writerName?: string;
  writerId?: number;
  hit?: number;
  createdDate?: string;
  category?: Category;
}

export class Board implements IBoard {
  constructor(
    public id?: number,
    public title?: string,
    public content?: string,
    public writerName?: string,
    public writerId?: number,
    public hit?: number,
    public createdDate?: string,
    public category?: Category
  ) {}
}
