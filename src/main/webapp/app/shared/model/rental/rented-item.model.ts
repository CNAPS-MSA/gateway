export interface IRentedItem {
  id?: number;
  bookId?: number;
  rentedDate?: Date;
  dueDate?: Date;
  bookTitle?: string;
  rentalId?: number;
}

export class RentedItem implements IRentedItem {
  constructor(
    public id?: number,
    public bookId?: number,
    public rentedDate?: Date,
    public dueDate?: Date,
    public bookTitle?: string,
    public rentalId?: number
  ) {}
}
