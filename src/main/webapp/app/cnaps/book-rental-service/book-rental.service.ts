import axios from 'axios';

import buildPaginationQueryOpts from '@/shared/sort/sorts';

import { IRental } from '@/shared/model/rental/rental.model';
import { IBookCatalog } from '@/shared/model/bookCatalog/book-catalog.model';

const rentalApiUrl = 'services/rental/api';
const bookApiUrl = 'services/bookcatalog/api/book-catalogs';

export default class BookRentalService {
  public find(id: number): Promise<IBookCatalog> {
    return new Promise<IBookCatalog>((resolve, reject) => {
      axios
        .get(`${bookApiUrl}/${id}`)
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
        .get(bookApiUrl + `?${buildPaginationQueryOpts(paginationQuery)}`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public findByTitle(title: String): Promise<IBookCatalog> {
    return new Promise<IBookCatalog>((resolve, reject) => {
      axios
        .get(`${bookApiUrl}/title/${title}`)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public rentBooks(userId: any, selected: Array<any>): Promise<IRental> {
    return new Promise<IRental>((resolve, reject) => {
      axios
        .post(`${rentalApiUrl}/rental/user/${userId}/books/${selected}`)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  // public delete(id: number): Promise<any> {
  //   return new Promise<any>((resolve, reject) => {
  //     axios
  //       .delete(`${baseApiUrl}/${id}`)
  //       .then(res => {
  //         resolve(res);
  //       })
  //       .catch(err => {
  //         reject(err);
  //       });
  //   });
  // }

  // public create(entity: IRental): Promise<IRental> {
  //   return new Promise<IRental>((resolve, reject) => {
  //     axios
  //       .post(`${baseApiUrl}`, entity)
  //       .then(res => {
  //         resolve(res.data);
  //       })
  //       .catch(err => {
  //         reject(err);
  //       });
  //   });
  // }

  // public update(entity: IRental): Promise<IRental> {
  //   return new Promise<IRental>((resolve, reject) => {
  //     axios
  //       .put(`${baseApiUrl}`, entity)
  //       .then(res => {
  //         resolve(res.data);
  //       })
  //       .catch(err => {
  //         reject(err);
  //       });
  //   });
  // }
}
