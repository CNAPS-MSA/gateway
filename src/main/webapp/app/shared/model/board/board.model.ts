export const enum Category {
  Notify = 'Notice',
  Normal = 'Normal',
}

export interface IBoard {
  id?: number;
  title?: string;
  content?: string;
  writerName?: string;
  writerId?: number;
  hit?: number;
  createdDate?: Date;
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
    public createdDate?: Date,
    public category?: Category
  ) {}
}
