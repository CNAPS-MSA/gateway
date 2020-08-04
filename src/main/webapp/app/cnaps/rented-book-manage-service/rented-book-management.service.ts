import axios from 'axios';

import buildPaginationQueryOpts from '@/shared/sort/sorts';

import { IRentedItem } from '@/shared/model/rental/rented-item.model';
import { IRental } from '@/shared/model/rental/rental.model';
import { IUser } from '@/shared/model/user.model';

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

  // public create(entity: IBook, inStockId: number): Promise<IBook> {
  //   return new Promise<IBook>((resolve, reject) => {
  //     axios
  //       .post(`${bookApiUrl}/${inStockId}`, entity)
  //       .then(res => {
  //         resolve(res.data);
  //       })
  //       .catch(err => {
  //         reject(err);
  //       });
  //   });
  // }
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
