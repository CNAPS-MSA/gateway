import axios from 'axios';

import buildPaginationQueryOpts from '@/shared/sort/sorts';
import { IBoard } from '@/shared/model/board/board.model';

const boardApiUrl = 'services/board/api/board';
const commentApiUrl = 'services/comment/api/comment';

export default class BoardService {
  public find(id: number): Promise<IBoard> {
    return new Promise<IBoard>((resolve, reject) => {
      axios
        .get(`${boardApiUrl}/${id}`)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public retrieve(paginationQuery): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .get(`${boardApiUrl}` + `?${buildPaginationQueryOpts(paginationQuery)}`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public retrieveAllComments(paginationQuery, boardId: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .get(`${commentApiUrl}/${boardId}` + `?${buildPaginationQueryOpts(paginationQuery)}`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public register(board: IBoard): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .post(`${boardApiUrl}`, board)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public delete(boardId: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .delete(`${boardApiUrl}/${boardId}`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public update(board: IBoard): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .put(`${boardApiUrl}`, board)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  // public findByTitle(title: String, paginationQuery?: any): Promise<any> {
  //   return new Promise<any>((resolve, reject) => {
  //     axios
  //       .get(`${bookApiUrl}/title/${title}` + `?${buildPaginationQueryOpts(paginationQuery)}`)
  //       .then(res => {
  //         resolve(res);
  //       })
  //       .catch(err => {
  //         reject(err);
  //       });
  //   });
  // }
  //
  // public rentBooks(userId: any, selected: number): Promise<any> {
  //   return new Promise<any>((resolve, reject) => {
  //     axios
  //       .post(`${rentalApiUrl}/${userId}/RentedItem/${selected}`)
  //       .then(res => {
  //         resolve(res);
  //       })
  //       .catch(err => {
  //         console.log(err.response.data.message);
  //         reject(err);
  //       });
  //   });
  // }

  public findByCategory(category: string, paginationQuery): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .get(`${boardApiUrl}/category/${category}` + `?${buildPaginationQueryOpts(paginationQuery)}`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
