import EstablishmentRepository from '../../domain/repositories/establishment-repository';
import RepositoryFactory from '../../domain/repositories/repository-factory';
import UserRepository from '../../domain/repositories/user-repository';
import EstablishmentRepositoryInMemory from './establishment-repository-in-memory';
import UserRepositoryInMemory from './user-repository-in-memory';

export default class RepositoryFactoryInMemory implements RepositoryFactory {
  createUserRepository(): UserRepository {
    return new UserRepositoryInMemory();
  }

  createEstablishmentRepository(): EstablishmentRepository {
    return new EstablishmentRepositoryInMemory();
  }
}
