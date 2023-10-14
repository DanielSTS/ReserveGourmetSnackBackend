import Comment from '../../src/domain/entities/comment';
describe('Comment', () => {
  const reservationId = 'reservation-id';
  const userId = 'user-id';
  const id = 'comment-id';
  const validText = 'Valid comment';
  const invalidText = '';

  test('should create a new comment with the given parameters', () => {
    const comment = new Comment(reservationId, userId, id, validText);

    expect(comment.reservationId).toBe(reservationId);
    expect(comment.userId).toBe(userId);
    expect(comment.id).toBe(id);
    expect(comment.text).toBe(validText);
  });

  test('should throw an error if the comment text is empty', () => {
    expect(() => {
      new Comment(reservationId, userId, id, invalidText);
    }).toThrow('Comment must have at least 1 character');
  });
});
