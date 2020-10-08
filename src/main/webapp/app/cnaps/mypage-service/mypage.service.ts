import axios from 'axios';

import buildPaginationQueryOpts from '@/shared/sort/sorts';

import { IRentedItem } from '@/shared/model/rental/rented-item.model';
import { IRental } from '@/shared/model/rental/rental.model';
import { IUser } from '@/shared/model/user.model';

const rentedItemApiUrl = 'services/rental/api/rented-items';
const overdueItemApiUrl = 'services/rental/api/overdue-items';
const returnedItemApiUrl = 'services/rental/api/returned-items';
const rentalApiUrl = 'services/rental/api/rentals';

export default class MyPageService {
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

  public retrieveRented(rentalId: number, paginationQuery?: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .get(`${rentedItemApiUrl}/rental/${rentalId}` + `?${buildPaginationQueryOpts(paginationQuery)}`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  public retrieveOverdue(rentalId: number, paginationQuery?: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .get(`${overdueItemApiUrl}/rental/${rentalId}` + `?${buildPaginationQueryOpts(paginationQuery)}`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  public retrieveReturned(rentalId: number, paginationQuery?: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .get(`${returnedItemApiUrl}/rental/${rentalId}` + `?${buildPaginationQueryOpts(paginationQuery)}`)
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

  public retrieveRental(userId: any): Promise<IRental> {
    return new Promise<IRental>((resolve, reject) => {
      axios
        .get(`${rentalApiUrl}/loadInfo/${userId}`)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public releaseOverdue(userId: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .put(`${rentalApiUrl}/release-overdue/user/${userId}`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public requestReturn(userId: any, requestReturnId: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .delete(`${rentalApiUrl}/${userId}/RentedItem/${requestReturnId}`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public requestOverdueReturn(userId: any, requestReturnId: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .delete(`${rentalApiUrl}/${userId}/OverdueItem/${requestReturnId}`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public loadUserInfo(userid: any): Promise<IUser> {
    return new Promise<IUser>((resolve, reject) => {
      axios
        .get(`api/users/find/${userid}`)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
