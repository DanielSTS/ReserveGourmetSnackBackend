import PgPromiseConnectionAdapter from '../database/pg-promise-adapter';
import EstablishmentDaoDatabase from './establishment-dao-database';
import ReservationDao from '../../application/dao/reservation-dao';
import DaoFactory from '../../application/dao/dao-factory';
import EstablishmentDao from '../../application/dao/establishment-dao';
import ReservationDaoDatabase from './reservation-dao-database';

export default class DaoFactoryDatabase implements DaoFactory {
  createReservationDao(): ReservationDao {
    return new ReservationDaoDatabase(PgPromiseConnectionAdapter.getInstance());
  }

  createEstablishmentDao(): EstablishmentDao {
    return new EstablishmentDaoDatabase(
      PgPromiseConnectionAdapter.getInstance()
    );
  }
}
