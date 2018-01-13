import {
  Module,
  NestModule,
  MiddlewaresConsumer,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentsController } from './comments.controller';
import { ReviewsService } from '../data/repositories/reviews.service';
import { CommentsService } from '../data/repositories/comments.service';
import { ReviewSchema } from '../models/schemas/review.schema';
import { CommentSchema } from '../models/schemas/comment.schema';
import { EnsureLoggedInMiddleware } from '../common/middlewares/ensureLoggedIn.middleware';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'Review', schema: ReviewSchema },
    { name: 'Comment', schema: CommentSchema },
  ])],
  controllers: [CommentsController],
  components: [ReviewsService, CommentsService],
})

export class CommentsModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer) {
    consumer
      .apply(EnsureLoggedInMiddleware)
      .forRoutes(CommentsController);
  }
}
