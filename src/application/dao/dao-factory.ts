import EstablishmentDao from './establishment-dao';
import ReservationDao from './reservation-dao';

export default interface DaoFactory {
  createReservationDao(): ReservationDao;
  createEstablishmentDao(): EstablishmentDao;
}
