import axios from 'axios';

import buildPaginationQueryOpts from '@/shared/sort/sorts';
import { IBookCatalog } from '@/shared/model/bookCatalog/book-catalog.model';

const rentalApiUrl = 'services/rental/api/rentals';
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

  public findByTitle(title: String, paginationQuery?: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .get(`${bookApiUrl}/title/${title}` + `?${buildPaginationQueryOpts(paginationQuery)}`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public rentBooks(userId: any, selected: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .post(`${rentalApiUrl}/${userId}/RentedItem/${selected}`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log(err.response.data.message);
          reject(err);
        });
    });
  }

  public retrieveTop10(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .get(`${bookApiUrl}/top-10`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
