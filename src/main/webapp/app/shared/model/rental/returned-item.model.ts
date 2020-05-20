import { Moment } from 'moment';

export interface IReturnedItem {
  id?: number;
  bookId?: number;
  returnedDate?: Moment;
  rentalId?: number;
}

export const defaultValue: Readonly<IReturnedItem> = {};
