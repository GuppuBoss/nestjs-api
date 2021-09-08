import {Document} from 'mongoose';

export interface userInterface extends Document{
  id: number;
  name: string;
  username: string;
  password: string;
  email: string;
}