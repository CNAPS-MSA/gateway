export interface IUser {
  id?: number;
  name?: string;
  email?: string;
}

export const defaultValue: Readonly<IUser> = {};
