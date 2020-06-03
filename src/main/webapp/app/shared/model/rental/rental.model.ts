import { IRentedItem } from 'app/shared/model/rental/rented-item.model';
import { IOverdueItem } from 'app/shared/model/rental/overdue-item.model';
import { IReturnedItem } from 'app/shared/model/rental/returned-item.model';
import { RentalStatus } from 'app/shared/model/enumerations/rental-status.model';

export interface IRental {
  id?: number;
  userId?: number;
  lateFee?: number;
  rentalStatus?: RentalStatus;
  rentedItems?: IRentedItem[];
  overdueItems?: IOverdueItem[];
  returnedItems?: IReturnedItem[];
}

export const defaultValue: Readonly<IRental> = {};
