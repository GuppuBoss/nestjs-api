import {Document} from 'mongoose';

export interface userInterface extends Document{
  readonly id: number;
  readonly name: string;
  readonly username: string;
  readonly password: string;
  readonly email: string;
}