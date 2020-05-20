import { Moment } from 'moment';

export interface IRentedItem {
  id?: number;
  bookId?: number;
  rentedDate?: Moment;
  dueDate?: Moment;
  rentalId?: number;
}

export const defaultValue: Readonly<IRentedItem> = {};
