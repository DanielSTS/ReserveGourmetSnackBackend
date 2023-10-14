import Comment from '../../domain/entities/comment';
import CommentRepository from '../../domain/repositories/comment-repository';
import ReservationRepository from '../../domain/repositories/reservation-repository';
import UserRepository from '../../domain/repositories/user-repository';
import { randomUUID } from 'crypto';

export default class CreateComment {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    private readonly userRepository: UserRepository,
    private readonly commentRepository: CommentRepository
  ) {}
  async execute(input: Input) {
    await this.userRepository.getById(input.userId);
    await this.reservationRepository.getById(input.reservationId);
    const comment = new Comment(
      input.reservationId,
      input.userId,
      randomUUID(),
      input.comment
    );
    await this.commentRepository.save(comment);
    return 'sucess';
  }
}

type Input = {
  reservationId: string;
  userId: string;
  comment: string;
};
