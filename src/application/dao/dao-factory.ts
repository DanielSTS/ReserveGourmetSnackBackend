import EstablishmentDao from './establishment-dao';
import ReservationDao from './reservation-dao';
import UserDao from './user-dao';

export default interface DaoFactory {
  createUserDao(): UserDao;
  createReservationDao(): ReservationDao;
  createEstablishmentDao(): EstablishmentDao;
}
