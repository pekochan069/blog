export class BaseError<Tag extends string> {
  readonly _tag: Tag;
  constructor(tag: Tag) {
    this._tag = tag;
  }
}
