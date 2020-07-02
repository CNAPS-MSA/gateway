export interface IReturnedItem {
  id?: number;
  bookId?: number;
  returnedDate?: Date;
  bookTitle?: string;
  rentalId?: number;
}

export class ReturnedItem implements IReturnedItem {
  constructor(
    public id?: number,
    public bookId?: number,
    public returnedDate?: Date,
    public bookTitle?: string,
    public rentalId?: number
  ) {}
}
