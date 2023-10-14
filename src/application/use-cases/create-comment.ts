import Comment from '../../domain/entities/comment';
import CommentRepository from '../../domain/repositories/comment-repository';
import EstablishmentRepository from '../../domain/repositories/establishment-repository';
import UserRepository from '../../domain/repositories/user-repository';
import { randomUUID } from 'crypto';

export default class CreateComment {
  constructor(
    private readonly establishmentRepository: EstablishmentRepository,
    private readonly userRepository: UserRepository,
    private readonly commentRepository: CommentRepository
  ) {}
  async execute(input: Input) {
    await this.userRepository.getById(input.userId);
    await this.establishmentRepository.getById(input.establishmentId);
    const comment = new Comment(
      input.establishmentId,
      input.userId,
      randomUUID(),
      input.comment
    );
    await this.commentRepository.save(comment);
  }
}

type Input = {
  establishmentId: string;
  userId: string;
  comment: string;
};
