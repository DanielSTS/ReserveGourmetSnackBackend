import CommentRepository from '../../domain/repositories/comment-repository';
import EstablishmentRepository from '../../domain/repositories/establishment-repository';
import RepositoryFactory from '../../domain/repositories/repository-factory';
import ReservationRepository from '../../domain/repositories/reservation-repository';
import ReviewRepository from '../../domain/repositories/review-repository';
import UserRepository from '../../domain/repositories/user-repository';
import PgPromiseConnectionAdapter from '../database/pg-promise-adapter';
import CommentRepositoryDatabase from './comment-repository-database';
import EstablishmentRepositoryDatabase from './establishment-repository-database';
import ReservationRepositoryDatabase from './reservation-repository-database';
import ReviewRepositoryDatabase from './review-repository-database';
import UserRepositoryDatabase from './user-repository-database';

export default class RepositoryFactoryDatabase implements RepositoryFactory {
  createUserRepository(): UserRepository {
    return new UserRepositoryDatabase(PgPromiseConnectionAdapter.getInstance());
  }

  createEstablishmentRepository(): EstablishmentRepository {
    return new EstablishmentRepositoryDatabase(
      PgPromiseConnectionAdapter.getInstance()
    );
  }

  createReservationRepository(): ReservationRepository {
    return new ReservationRepositoryDatabase(
      PgPromiseConnectionAdapter.getInstance()
    );
  }

  createReviewRepository(): ReviewRepository {
    return new ReviewRepositoryDatabase(
      PgPromiseConnectionAdapter.getInstance()
    );
  }

  createCommentRepository(): CommentRepository {
    return new CommentRepositoryDatabase(
      PgPromiseConnectionAdapter.getInstance()
    );
  }
}
