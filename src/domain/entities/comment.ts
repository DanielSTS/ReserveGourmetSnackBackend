export default class Comment {
  constructor(
    readonly establishmentId: string,
    readonly userId: string,
    readonly id: string,
    readonly text: string
  ) {
    if (text.length <= 0) {
      throw new Error('Comment must have at least 1 character');
    }
  }
}
