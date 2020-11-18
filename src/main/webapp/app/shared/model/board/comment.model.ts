export interface IComment {
  id?: number;
  content?: string;
  writerName?: string;
  writerId?: number;
  createdDate?: string;
  boardId?: number;
}

export class Comment implements IComment {
  constructor(
    public id?: number,
    public content?: string,
    public writerName?: string,
    public writerId?: number,
    public createdDate?: string,
    public boardId?: number
  ) {}
}
