import UserRepository from '../../domain/repositories/user-repository';
import CommentRepository from './comment-repository';
import EstablishmentRepository from './establishment-repository';
import ReservationRepository from './reservation-repository';
import ReviewRepository from './review-repository';

export default interface RepositoryFactory {
  createReservationRepository(): ReservationRepository;
  createUserRepository(): UserRepository;
  createEstablishmentRepository(): EstablishmentRepository;
  createReviewRepository(): ReviewRepository;
  createCommentRepository(): CommentRepository;
}
