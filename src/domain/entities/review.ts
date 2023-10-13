export default class Review {
  constructor(
    readonly establishmentId: string,
    readonly userId: string,
    readonly id: string,
    readonly rating: number,
    readonly comment: string
  ) {
    if (rating < 1 || rating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }
  }
}
