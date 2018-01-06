import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DbConnectionString',
    useFactory: async (): Promise<mongoose.Connection> => {
      (mongoose as any).Promise = global.Promise;
      return await mongoose.connect('mongodb://172.17.0.2/rangefindersreview');
    },
  },
];
