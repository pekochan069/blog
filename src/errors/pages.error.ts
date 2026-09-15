import { BaseError } from "./base.error";

export type InvalidPageNumberErrorTag = "InvalidPageNumber";

export class InvalidPageNumberError extends BaseError<InvalidPageNumberErrorTag> {
  page: number;
  maxPages: number;
  constructor(page: number, maxPages: number) {
    super("InvalidPageNumber");
    this.page = page;
    this.maxPages = maxPages;
  }
}
