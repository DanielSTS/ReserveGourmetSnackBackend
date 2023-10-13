import Review from '../entities/review';

export default interface ReviewRepository {
  save(review: Review): Promise<void>;
}
