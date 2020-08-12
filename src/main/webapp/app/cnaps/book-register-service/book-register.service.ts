import axios from 'axios';

import buildPaginationQueryOpts from '@/shared/sort/sorts';

import { IInStockBook } from '@/shared/model/book/in-stock-book.model';
import { IBook } from '@/shared/model/book/book.model';

const inStockBookApiUrl = 'services/book/api/in-stock-books';
const bookApiUrl = 'services/book/api/books';

export default class BookRegisterService {
  public find(id: number): Promise<IInStockBook> {
    return new Promise<IInStockBook>((resolve, reject) => {
      axios
        .get(`${inStockBookApiUrl}/${id}`)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public retrieve(paginationQuery?: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .get(inStockBookApiUrl + `?${buildPaginationQueryOpts(paginationQuery)}`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public findByTitle(title: String, paginationQuery?: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .get(`${inStockBookApiUrl}/title/${title}` + `?${buildPaginationQueryOpts(paginationQuery)}`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public create(entity: IBook, inStockId: number): Promise<IBook> {
    return new Promise<IBook>((resolve, reject) => {
      axios
        .post(`${bookApiUrl}/${inStockId}`, entity)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
