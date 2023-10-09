import EstablishmentRepository from '../../../domain/repositories/establishiment-repository';
import RepositoryFactory from '../../../domain/repositories/repository-factory';
import UserRepository from '../../../domain/repositories/user-repository';
import EstablishimentRepositoryInMemory from './establishiment-repository-in-memory';
import UserRepositoryInMemory from './user-repository-in-memory';

export default class RepositoryFactoryInMemory implements RepositoryFactory {
  createUserRepository(): UserRepository {
    return new UserRepositoryInMemory();
  }

  createEstablishimentRepository(): EstablishmentRepository {
    return new EstablishimentRepositoryInMemory();
  }
}
