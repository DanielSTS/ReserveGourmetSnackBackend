import Connection from '../database/connection';
import CommentRepository from '../../domain/repositories/comment-repository';
import Comment from '../../domain/entities/comment';

export default class CommentRepositoryDatabase implements CommentRepository {
  constructor(readonly connection: Connection) {}
  async save(comment: Comment): Promise<void> {
    const query = `
    INSERT INTO public.comment 
      (reservation_id, user_id, id, text)
    VALUES 
      ($1, $2, $3, $4)`;
    const values = [
      comment.reservationId,
      comment.userId,
      comment.id,
      comment.text
    ];
    await this.connection.query(query, values);
  }
}
