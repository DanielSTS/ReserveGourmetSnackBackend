import Connection from '../database/connection';
import ReviewRepository from '../../domain/repositories/review-repository';
import Review from '../../domain/entities/review';

export default class ReviewRepositoryDatabase implements ReviewRepository {
  constructor(readonly connection: Connection) {}
  async save(review: Review): Promise<void> {
    const query = `
    INSERT INTO public.review 
      (establishment_id, user_id, id, rating, comment)
    VALUES 
      ($1, $2, $3, $4, $5)`;
    const values = [
      review.establishmentId,
      review.userId,
      review.id,
      review.rating,
      review.comment
    ];
    await this.connection.query(query, values);
  }
}
