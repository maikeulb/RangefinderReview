import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { HomeModule } from './home/home.module';
import { AccountModule } from './account/account.module';
import { ReviewsModule } from './reviews/reviews.module';
import { CommentsModule } from './comments/comments.module';

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});

@Module({
  imports: [MongooseModule.forRoot('mongodb://172.19.0.2/rangefindersreview'), HomeModule, AccountModule, ReviewsModule, CommentsModule ],
})

export class ApplicationModule {}
