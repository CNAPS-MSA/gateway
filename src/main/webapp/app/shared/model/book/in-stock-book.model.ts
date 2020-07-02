export const enum Source {
  Donated = 'Donated',
  Purchased = 'Purchased',
}

export interface IInStockBook {
  id?: number;
  title?: string;
  description?: string;
  author?: string;
  publisher?: string;
  isbn?: number;
  publicationDate?: Date;
  source?: Source;
}

export class InStockBook implements IInStockBook {
  constructor(
    public id?: number,
    public title?: string,
    public description?: string,
    public author?: string,
    public publisher?: string,
    public isbn?: number,
    public publicationDate?: Date,
    public source?: Source
  ) {}
}
