import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { HomeModule } from './home/home.module';
import { AccountModule } from './account/account.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  modules: [ HomeModule, AccountModule, ReviewsModule ],
  components: [],
})

export class ApplicationModule {}
