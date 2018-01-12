import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { HomeModule } from './home/home.module';
import { AccountModule } from './account/account.module';
import { ReviewsModule } from './reviews/reviews.module';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://172.19.0.2/rangefindersreview'), HomeModule, AccountModule, ReviewsModule ],
})

export class ApplicationModule {}
