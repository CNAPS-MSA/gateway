import { BookStatus } from 'app/shared/model/enumerations/book-status.model';
import { Categories } from 'app/shared/model/enumerations/categories.model';

export interface IBook {
  id?: number;
  title?: string;
  author?: string;
  description?: string;
  bookStatus?: BookStatus;
  category?: Categories;
  barcode?: number;
}

export const defaultValue: Readonly<IBook> = {};
