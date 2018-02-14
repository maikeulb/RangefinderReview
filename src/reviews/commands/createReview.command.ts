export class CreateReviewCommand {
  readonly name: string;
  readonly imageUrl: string;
  readonly description: string;
  author: {
    id: string,
    username: string,
  };
};
