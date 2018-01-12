import { Connection } from 'mongoose';
import { ReviewSchema } from './schemas/review.schema';

export const reviewsProviders = [
  {
    provide: 'ReviewsToken',
    useFactory: (connection: Connection) => connection.model('reviews', ReviewSchema),
    inject: ['DbConnectionString'],
  },
];
