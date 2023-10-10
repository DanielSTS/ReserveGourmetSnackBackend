import EstablishmentRepository from '../../domain/repositories/establishment-repository';
import RepositoryFactory from '../../domain/repositories/repository-factory';
import UserRepository from '../../domain/repositories/user-repository';
import PgPromiseConnectionAdapter from '../database/pg-promise-adapter';
import EstablishmentRepositoryDatabase from './establishment-repository-database';
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
}
