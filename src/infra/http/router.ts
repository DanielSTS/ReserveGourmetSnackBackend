import CreateReservation from '../../application/use-cases/create-reservation';
import CreateUser from '../../application/use-cases/create-user';
import CreateUserOwner from '../../application/use-cases/create-user-owner';
import UpdateUser from '../../application/use-cases/update-user';
import UpdateEstablishment from '../../application/use-cases/update-establishment';
import UpdateReservation from '../../application/use-cases/update-reservation';
import RepositoryFactory from '../../domain/repositories/repository-factory';
import HttpServer from './http-server';
import GetEstablishments from '../../application/use-cases/get-establishments';
import DaoFactory from '../../application/dao/dao-factory';
import GetReservations from '../../application/use-cases/get-reservations';

export default class Router {
  constructor(
    http: HttpServer,
    repositoryFactory: RepositoryFactory,
    daoFactory: DaoFactory
  ) {
    const userRepository = repositoryFactory.createUserRepository();
    const establishmentRepository =
      repositoryFactory.createEstablishmentRepository();

    const createUser = new CreateUser(userRepository);
    const createUserAdmin = new CreateUserOwner(userRepository);
    const updateUser = new UpdateUser(userRepository);
    const updateEstablishment = new UpdateEstablishment(
      userRepository,
      establishmentRepository
    );
    const updateReservation = new UpdateReservation(
      establishmentRepository,
      userRepository
    );
    const createReservation = new CreateReservation(
      establishmentRepository,
      userRepository
    );

    const reservationDao = daoFactory.createReservationDao();
    const establishmentDao = daoFactory.createEstablishmentDao();
    const getEstablishment = new GetEstablishments(establishmentDao);
    const getReservationByUser = new GetReservations(reservationDao);

    http.on('post', '/users', function (params: any, body: any) {
      return createUser.execute(body);
    });

    http.on('post', '/createUserAdmin', function (params: any, body: any) {
      return createUserAdmin.execute(body);
    });

    http.on('put', '/users', function (params: any, body: any) {
      return updateUser.execute(body);
    });

    http.on('put', '/establishments', function (params: any, body: any) {
      return updateEstablishment.execute(body);
    });

    http.on('put', '/updateReservation', function (params: any, body: any) {
      return updateReservation.execute(body);
    });

    http.on('post', '/createReservation', function (params: any, body: any) {
      return createReservation.execute(body);
    });

    http.on('get', '/establishments', function (params: any, body: any) {
      return getEstablishment.execute();
    });

    http.on('get', '/reservations', function (params: any, body: any) {
      return getReservationByUser.execute(body);
    });
  }
}
