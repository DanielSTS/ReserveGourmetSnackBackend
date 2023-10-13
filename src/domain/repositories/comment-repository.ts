import Comment from '../entities/comment';

export default interface CommentRepository {
  save(comment: Comment): Promise<void>;
}
