import {
  Module,
  NestModule,
  MiddlewaresConsumer,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from '../data/repositories/reviews.service';
import { ReviewSchema } from '../models/schemas/review.schema';
import { EnsureLoggedInMiddleware } from '../common/middlewares/ensureLoggedIn.middleware';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Review', schema: ReviewSchema }])],
  controllers: [ReviewsController],
  components: [ReviewsService],
})

// export class ReviewsModule { }
export class ReviewsModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer) {
    consumer
      .apply(EnsureLoggedInMiddleware)
      .forRoutes(ReviewsController);
  }
}
