import UserRepository from '../../domain/repositories/user-repository';
import EstablishmentRepository from './establishment-repository';
import ReservationRepository from './reservation-repository';

export default interface RepositoryFactory {
  createReservationRepository(): ReservationRepository;
  createUserRepository(): UserRepository;
  createEstablishmentRepository(): EstablishmentRepository;
}
