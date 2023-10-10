import UserRepository from '../../domain/repositories/user-repository';
import EstablishmentRepository from './establishment-repository';

export default interface RepositoryFactory {
  createUserRepository(): UserRepository;
  createEstablishmentRepository(): EstablishmentRepository;
}
