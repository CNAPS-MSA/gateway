import { BookStatus } from 'app/shared/model/enumerations/book-status.model';

export interface IBook {
  id?: number;
  title?: string;
  author?: string;
  description?: string;
  bookStatus?: BookStatus;
}

export const defaultValue: Readonly<IBook> = {};
