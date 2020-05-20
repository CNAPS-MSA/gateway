import { Moment } from 'moment';

export interface IOverdueItem {
  id?: number;
  bookId?: number;
  dueDate?: Moment;
  rentalId?: number;
}

export const defaultValue: Readonly<IOverdueItem> = {};
