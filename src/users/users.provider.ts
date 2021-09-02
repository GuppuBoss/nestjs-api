import { Connection } from "mongoose";
import { userSchema } from "src/schemas/user.schema";
import config from '../config';

export const UsersProvider = [ {
  provide: config.USER_MODEL,
  useFactory: (connection: Connection) => connection.model('User', userSchema),
  inject: [ config.DATABASE_CONNECTION ]
} ]