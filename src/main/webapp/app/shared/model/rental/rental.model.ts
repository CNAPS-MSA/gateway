import { IRentedItem } from '@/shared/model/rental/rented-item.model';
import { IOverdueItem } from '@/shared/model/rental/overdue-item.model';
import { IReturnedItem } from '@/shared/model/rental/returned-item.model';

export const enum RentalStatus {
  RENT_AVAILABLE = 'RENT_AVAILABLE',
  RENT_UNAVAILABLE = 'RENT_UNAVAILABLE',
}

export interface IRental {
  id?: number;
  userId?: number;
  rentalStatus?: RentalStatus;
  lateFee?: number;
  rentedItems?: IRentedItem[];
  overdueItems?: IOverdueItem[];
  returnedItems?: IReturnedItem[];
}

export class Rental implements IRental {
  constructor(
    public id?: number,
    public userId?: number,
    public rentalStatus?: RentalStatus,
    public lateFee?: number,
    public rentedItems?: IRentedItem[],
    public overdueItems?: IOverdueItem[],
    public returnedItems?: IReturnedItem[]
  ) {}
}
