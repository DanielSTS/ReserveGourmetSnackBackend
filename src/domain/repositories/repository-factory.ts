import UserRepository from '../../domain/repositories/user-repository';
import EstablishmentRepository from './establishiment-repository';

export default interface RepositoryFactory {
  createUserRepository(): UserRepository;
  createEstablishimentRepository(): EstablishmentRepository;
}
