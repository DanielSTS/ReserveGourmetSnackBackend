import Review from '../../domain/entities/review';
import EstablishmentRepository from '../../domain/repositories/establishment-repository';
import ReviewRepository from '../../domain/repositories/review-repository';
import UserRepository from '../../domain/repositories/user-repository';
import { randomUUID } from 'crypto';

export default class CreateReview {
  constructor(
    private readonly establishmentRepository: EstablishmentRepository,
    private readonly userRepository: UserRepository,
    private readonly reviewRepository: ReviewRepository
  ) {}
  async execute(input: Input) {
    await this.userRepository.getById(input.userId);
    await this.establishmentRepository.getById(input.establishmentId);
    const review = new Review(
      input.establishmentId,
      input.userId,
      randomUUID(),
      input.rating,
      input.comment
    );
    await this.reviewRepository.save(review);
    return 'sucess';
  }
}

type Input = {
  establishmentId: string;
  userId: string;
  rating: number;
  comment: string;
};
