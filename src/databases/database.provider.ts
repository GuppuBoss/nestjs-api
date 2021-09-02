import * as mongoose from 'mongoose';
import config from '../config';

export const DatabaseProvider = [ {
  provide: config.DATABASE_CONNECTION,
  useFactory: (): Promise<typeof mongoose> => mongoose.connect(config.DATABASE_CONNECTION_URL),
} ]