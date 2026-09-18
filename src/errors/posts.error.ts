import { BaseError } from "./base.error";

export type InvalidPostIdErrorTag = "InvalidPostId";

export class InvalidPostIdError extends BaseError<InvalidPostIdErrorTag> {
  postId: string;
  constructor(postId: string) {
    super("InvalidPostId");
    this.postId = postId;
  }
}
