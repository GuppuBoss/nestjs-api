import { Connection } from "mongoose";
import { userSchema } from "src/schemas/user.schema";

export const UsersProvider = [ {
  provide: `${process.env.USER_MODEL_PROVIDER}`,
  useFactory: (connection: Connection) => connection.model('User', userSchema),
  inject: [ `${process.env.DATABASE_CONNECTION_PROVIDER}` ]
} ]