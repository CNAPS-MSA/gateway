export interface IUser {
  id?: number;
  name?: string;
  email?: string;
  point?: number;
}

export const defaultValue: Readonly<IUser> = {};
