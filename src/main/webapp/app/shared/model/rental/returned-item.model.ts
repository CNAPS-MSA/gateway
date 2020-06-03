import { Moment } from 'moment';

export interface IReturnedItem {
  id?: number;
  bookId?: number;
  returnedDate?: Moment;
  bookTitle?: string;
  rentalId?: number;
}

export const defaultValue: Readonly<IReturnedItem> = {};
