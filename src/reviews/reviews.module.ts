import {
  Module,
  NestModule,
  MiddlewaresConsumer,
  RequestMethod,
} from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { reviewsProviders } from './reviews.providers';
import { EnsureLoggedInMiddleware } from '../common/middlewares/ensureLoggedIn.middleware';

@Module({
  modules: [DatabaseModule],
  controllers: [ReviewsController],
  components: [
    ReviewsService,
    ...reviewsProviders,
  ],
})
// export class ReviewsModule {}

export class ReviewsModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer) {
    consumer
      .apply(EnsureLoggedInMiddleware)
      .forRoutes(ReviewsController);
  }
}
