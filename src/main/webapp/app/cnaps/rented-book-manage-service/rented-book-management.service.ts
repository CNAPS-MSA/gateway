import axios from 'axios';

import buildPaginationQueryOpts from '@/shared/sort/sorts';

import { IRentedItem } from '@/shared/model/rental/rented-item.model';

const rentedItemApiUrl = 'services/rental/api/rented-items';
const rentalApiUrl = 'services/rental/api/rentals';

export default class RentedBookManagementService {
  public find(id: number): Promise<IRentedItem> {
    return new Promise<IRentedItem>((resolve, reject) => {
      axios
        .get(`${rentedItemApiUrl}/${id}`)
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
        .get(rentedItemApiUrl + `?${buildPaginationQueryOpts(paginationQuery)}`)
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
        .get(`${rentedItemApiUrl}/title/${title}` + `?${buildPaginationQueryOpts(paginationQuery)}`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  public overdue(overdueRentalId: number, overdueBookId: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .post(`${rentalApiUrl}/${overdueRentalId}/OverdueItem/${overdueBookId}`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
