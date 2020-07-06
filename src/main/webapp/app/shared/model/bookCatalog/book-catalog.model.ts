export interface IBookCatalog {
  id?: string;
  title?: string;
  description?: string;
  author?: string;
  publicationDate?: Date;
  classification?: string;
  rented?: boolean;
  rentCnt?: number;
  bookId?: number;
}

export class BookCatalog implements IBookCatalog {
  constructor(
    public id?: string,
    public title?: string,
    public description?: string,
    public author?: string,
    public publicationDate?: Date,
    public classification?: string,
    public rented?: boolean,
    public rentCnt?: number,
    public bookId?: number
  ) {
    this.rented = this.rented || false;
  }
}
