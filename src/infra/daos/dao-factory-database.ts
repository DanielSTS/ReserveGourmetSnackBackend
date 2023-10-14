import PgPromiseConnectionAdapter from '../database/pg-promise-adapter';
import EstablishmentDaoDatabase from './establishment-dao-database';
import ReservationDao from '../../application/daos/reservation-dao';
import DaoFactory from '../../application/daos/dao-factory';
import EstablishmentDao from '../../application/daos/establishment-dao';
import ReservationDaoDatabase from './reservation-dao-database';
import UserDao from '../../application/daos/user-dao';
import UserDaoDatabase from './user-dao-database';

export default class DaoFactoryDatabase implements DaoFactory {
  createUserDao(): UserDao {
    return new UserDaoDatabase(PgPromiseConnectionAdapter.getInstance());
  }

  createReservationDao(): ReservationDao {
    return new ReservationDaoDatabase(PgPromiseConnectionAdapter.getInstance());
  }

  createEstablishmentDao(): EstablishmentDao {
    return new EstablishmentDaoDatabase(
      PgPromiseConnectionAdapter.getInstance()
    );
  }
}
