import { Moment } from 'moment';
import { Source } from 'app/shared/model/enumerations/source.model';

export interface IInStockBook {
  id?: number;
  title?: string;
  description?: string;
  author?: string;
  publisher?: string;
  isbn?: number;
  publicationDate?: Moment;
  source?: Source;
}

export const defaultValue: Readonly<IInStockBook> = {};
