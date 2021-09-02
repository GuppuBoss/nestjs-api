import * as mongoose from 'mongoose';

export const DatabaseProvider = [ {
  provide: `${process.env.DATABASE_CONNECTION_PROVIDER}`,
  useFactory: (): Promise<typeof mongoose> => mongoose.connect(`${process.env.DATABASE_CONNECTION_URL}`),
} ]