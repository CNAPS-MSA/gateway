import { Moment } from 'moment';
import { Classification } from 'app/shared/model/enumerations/classification.model';
import { BookStatus } from 'app/shared/model/enumerations/book-status.model';
import { Location } from 'app/shared/model/enumerations/location.model';

export interface IBook {
  id?: number;
  title?: string;
  description?: string;
  author?: string;
  publisher?: string;
  isbn?: number;
  publicationDate?: Moment;
  classification?: Classification;
  bookStatus?: BookStatus;
  location?: Location;
}

export const defaultValue: Readonly<IBook> = {};
