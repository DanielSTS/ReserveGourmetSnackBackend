import Review from '../src/domain/entities/review';

describe('Review', () => {
  test('should create a new review with valid rating', () => {
    const establishmentId = 'establishment-id';
    const userId = 'user-id';
    const id = 'review-id';
    const rating = 4;
    const comment = 'Test comment';

    const review = new Review(establishmentId, userId, id, rating, comment);

    expect(review.establishmentId).toBe(establishmentId);
    expect(review.userId).toBe(userId);
    expect(review.id).toBe(id);
    expect(review.rating).toBe(rating);
    expect(review.comment).toBe(comment);
  });

  test('should throw an error when creating a new review with invalid rating', () => {
    const establishmentId = 'establishment-id';
    const userId = 'user-id';
    const id = 'review-id';
    const rating = 6;
    const comment = 'Test comment';

    expect(() => {
      new Review(establishmentId, userId, id, rating, comment);
    }).toThrow('Rating must be between 1 and 5');
  });
});
