export const enum Classification {
  Arts = 'Arts',
  Photography = 'Photography',
  Biographies = 'Biographies',
  BusinessMoney = 'BusinessMoney',
  Children = 'Children',
  ComputerTechnology = 'ComputerTechnology',
  History = 'History',
  Medical = 'Medical',
  Travel = 'Travel',
  Romance = 'Romance',
  Science = 'Science',
  Math = 'Math',
  SelfHelp = 'SelfHelp',
}

export const enum BookStatus {
  AVAILABLE = 'AVAILABLE',
  UNAVAILABLE = 'UNAVAILABLE',
}

export const enum Location {
  JEONGJA = 'JEONGJA',
  PANGYO = 'PANGYO',
}

export interface IBook {
  id?: number;
  title?: string;
  description?: string;
  author?: string;
  publisher?: string;
  isbn?: number;
  publicationDate?: Date;
  classification?: Classification;
  bookStatus?: BookStatus;
  location?: Location;
}

export class Book implements IBook {
  constructor(
    public id?: number,
    public title?: string,
    public description?: string,
    public author?: string,
    public publisher?: string,
    public isbn?: number,
    public publicationDate?: Date,
    public classification?: Classification,
    public bookStatus?: BookStatus,
    public location?: Location
  ) {}
}
