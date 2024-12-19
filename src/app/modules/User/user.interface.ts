/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { user_role } from './user.const';

export type TUser = {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked: boolean;
};

export interface UserModel extends Model<TUser> {
  isPasswordMatched(
    userPassword: string,
    hashedPassword: string
  ): Promise<boolean>;

  isBlocked(id: string): Promise<boolean>;
}

export type TUserRole = keyof typeof user_role;
