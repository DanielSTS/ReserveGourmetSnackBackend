import EstablishmentRepository from '../../../domain/repositories/establishiment-repository';
import RepositoryFactory from '../../../domain/repositories/repository-factory';
import UserRepository from '../../../domain/repositories/user-repository';
import PgPromiseConnectionAdapter from '../pg-promise-adapter';
import EstablishimentRepositoryDatabase from './establishiment-repository-database';
import UserRepositoryDatabase from './user-repository-database';

export default class RepositoryFactoryDatabase implements RepositoryFactory {
  createUserRepository(): UserRepository {
    return new UserRepositoryDatabase(PgPromiseConnectionAdapter.getInstance());
  }

  createEstablishimentRepository(): EstablishmentRepository {
    return new EstablishimentRepositoryDatabase(
      PgPromiseConnectionAdapter.getInstance()
    );
  }
}
