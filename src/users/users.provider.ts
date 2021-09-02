import { Connection } from "mongoose";
import { userSchema } from "src/schemas/user.schema";

export const UsersProvider = [ {
  provide: `USER_MODEL`,
  useFactory: (connection: Connection) => connection.model('User', userSchema),
  inject: [ `DATABASE_CONNECTION` ]
} ]