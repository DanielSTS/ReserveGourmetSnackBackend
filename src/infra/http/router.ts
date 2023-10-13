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
import GetReservationsByUser from '../../application/use-cases/get-reservations-by-user';
import GetReservationsByEstablishment from '../../application/use-cases/get-reservations-by-establishment';
import Login from '../../application/use-cases/login';
import CancelReservation from '../../application/use-cases/cancel-reservation';
import GetUserInfo from '../../application/use-cases/get-user-info';
import GetOwnerInfo from '../../application/use-cases/get-owner-info';
import LoginOwner from '../../application/use-cases/login-owner';
import { NodeMailerService } from '../email/nodemailer';

export default class Router {
  constructor(
    http: HttpServer,
    repositoryFactory: RepositoryFactory,
    daoFactory: DaoFactory
  ) {
    const userRepository = repositoryFactory.createUserRepository();
    const establishmentRepository =
      repositoryFactory.createEstablishmentRepository();
    const reservationRepository =
      repositoryFactory.createReservationRepository();

    const login = new Login(userRepository);
    const loginOwner = new LoginOwner(userRepository);
    const createUser = new CreateUser(userRepository);
    const createUserOwner = new CreateUserOwner(userRepository);
    const updateUser = new UpdateUser(userRepository);
    const updateEstablishment = new UpdateEstablishment(
      userRepository,
      establishmentRepository
    );

    const nodeMailer = new NodeMailerService();
    const createReservation = new CreateReservation(
      establishmentRepository,
      userRepository,
      reservationRepository,
      nodeMailer
    );

    const updateReservation = new UpdateReservation(
      establishmentRepository,
      reservationRepository
    );

    const cancelReservation = new CancelReservation(
      reservationRepository,
      establishmentRepository
    );

    const userDao = daoFactory.createUserDao();
    const reservationDao = daoFactory.createReservationDao();
    const establishmentDao = daoFactory.createEstablishmentDao();
    const getEstablishment = new GetEstablishments(establishmentDao);
    const getReservationByUser = new GetReservationsByUser(reservationDao);
    const getReservationByEstablishment = new GetReservationsByEstablishment(
      reservationDao
    );
    const getUserInfo = new GetUserInfo(userDao, reservationDao);
    const getOwnerInfo = new GetOwnerInfo(
      userDao,
      establishmentDao,
      reservationDao
    );

    http.on('post', '/login', function (params: any, body: any) {
      return login.execute(body);
    });

    http.on('post', '/login-owner', function (params: any, body: any) {
      return loginOwner.execute(body);
    });

    http.on('get', '/users/:id', function (params: any, body: any) {
      return getUserInfo.execute(params);
    });

    http.on('post', '/users', function (params: any, body: any) {
      return createUser.execute(body);
    });

    http.on('put', '/users', function (params: any, body: any) {
      return updateUser.execute(body);
    });

    http.on('post', '/owners', function (params: any, body: any) {
      return createUserOwner.execute(body);
    });

    http.on('get', '/owners/:id', function (params: any, body: any) {
      return getOwnerInfo.execute(params);
    });

    http.on('get', '/establishments', function (params: any, body: any) {
      return getEstablishment.execute();
    });

    http.on('put', '/establishments', function (params: any, body: any) {
      return updateEstablishment.execute(body);
    });

    http.on('post', '/reservations', function (params: any, body: any) {
      return createReservation.execute(body);
    });

    http.on('put', '/reservations', function (params: any, body: any) {
      return updateReservation.execute(body);
    });

    http.on('delete', '/reservations', function (params: any, body: any) {
      return cancelReservation.execute(body);
    });

    http.on(
      'get',
      '/reservations-by-user-id/:userId',
      function (params: any, body: any) {
        return getReservationByUser.execute(params);
      }
    );

    http.on(
      'get',
      '/reservations-by-establishment-id/:establishmentId',
      function (params: any, body: any) {
        return getReservationByEstablishment.execute(params);
      }
    );
  }
}
