/* tslint:disable max-line-length */
import axios from 'axios';
import { format } from 'date-fns';

import * as config from '@/shared/config/config';
import { DATE_FORMAT } from '@/shared/date/filters';
import BookCatalogService from '@/entities/bookCatalog/book-catalog/book-catalog.service';
import { BookCatalog } from '@/shared/model/bookCatalog/book-catalog.model';

const mockedAxios: any = axios;
const error = {
  response: {
    status: null,
    data: {
      type: null,
    },
  },
};

jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

describe('Service Tests', () => {
  describe('BookCatalog Service', () => {
    let service: BookCatalogService;
    let elemDefault;
    let currentDate: Date;
    beforeEach(() => {
      service = new BookCatalogService();
      currentDate = new Date();

      elemDefault = new BookCatalog('ID', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', currentDate, 'AAAAAAA', false, 0, 0);
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            publicationDate: format(currentDate, DATE_FORMAT),
          },
          elemDefault
        );
        mockedAxios.get.mockReturnValue(Promise.resolve({ data: returnedFromService }));

        return service.find('123').then(res => {
          expect(res).toMatchObject(elemDefault);
        });
      });

      it('should not find an element', async () => {
        mockedAxios.get.mockReturnValue(Promise.reject(error));
        return service
          .find('123')
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should create a BookCatalog', async () => {
        const returnedFromService = Object.assign(
          {
            id: 'ID',
            publicationDate: format(currentDate, DATE_FORMAT),
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            publicationDate: currentDate,
          },
          returnedFromService
        );

        mockedAxios.post.mockReturnValue(Promise.resolve({ data: returnedFromService }));
        return service.create({}).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not create a BookCatalog', async () => {
        mockedAxios.post.mockReturnValue(Promise.reject(error));

        return service
          .create({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should update a BookCatalog', async () => {
        const returnedFromService = Object.assign(
          {
            title: 'BBBBBB',
            description: 'BBBBBB',
            author: 'BBBBBB',
            publicationDate: format(currentDate, DATE_FORMAT),
            classification: 'BBBBBB',
            rented: true,
            rentCnt: 1,
            bookId: 1,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            publicationDate: currentDate,
          },
          returnedFromService
        );
        mockedAxios.put.mockReturnValue(Promise.resolve({ data: returnedFromService }));

        return service.update(expected).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not update a BookCatalog', async () => {
        mockedAxios.put.mockReturnValue(Promise.reject(error));

        return service
          .update({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should return a list of BookCatalog', async () => {
        const returnedFromService = Object.assign(
          {
            title: 'BBBBBB',
            description: 'BBBBBB',
            author: 'BBBBBB',
            publicationDate: format(currentDate, DATE_FORMAT),
            classification: 'BBBBBB',
            rented: true,
            rentCnt: 1,
            bookId: 1,
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            publicationDate: currentDate,
          },
          returnedFromService
        );
        mockedAxios.get.mockReturnValue(Promise.resolve([returnedFromService]));
        return service.retrieve({ sort: {}, page: 0, size: 10 }).then(res => {
          expect(res).toContainEqual(expected);
        });
      });

      it('should not return a list of BookCatalog', async () => {
        mockedAxios.get.mockReturnValue(Promise.reject(error));

        return service
          .retrieve()
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should delete a BookCatalog', async () => {
        mockedAxios.delete.mockReturnValue(Promise.resolve({ ok: true }));
        return service.delete('123').then(res => {
          expect(res.ok).toBeTruthy();
        });
      });

      it('should not delete a BookCatalog', async () => {
        mockedAxios.delete.mockReturnValue(Promise.reject(error));

        return service
          .delete('123')
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });
    });
  });
});
