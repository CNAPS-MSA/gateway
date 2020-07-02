export interface IOverdueItem {
  id?: number;
  bookId?: number;
  dueDate?: Date;
  bookTitle?: string;
  rentalId?: number;
}

export class OverdueItem implements IOverdueItem {
  constructor(public id?: number, public bookId?: number, public dueDate?: Date, public bookTitle?: string, public rentalId?: number) {}
}
