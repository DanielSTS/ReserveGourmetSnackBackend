import Comment from '../src/domain/entities/comment';
describe('Comment', () => {
  const establishmentId = 'establishment-id';
  const userId = 'user-id';
  const id = 'comment-id';
  const validText = 'Valid comment';
  const invalidText = '';

  test('should create a new comment with the given parameters', () => {
    const comment = new Comment(establishmentId, userId, id, validText);

    expect(comment.establishmentId).toBe(establishmentId);
    expect(comment.userId).toBe(userId);
    expect(comment.id).toBe(id);
    expect(comment.text).toBe(validText);
  });

  test('should throw an error if the comment text is empty', () => {
    expect(() => {
      new Comment(establishmentId, userId, id, invalidText);
    }).toThrow('Comment must have at least 1 character');
  });
});
