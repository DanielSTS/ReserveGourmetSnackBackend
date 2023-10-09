import CreateReservation from '../../application/use-cases/create-reservation';
import CreateUser from '../../application/use-cases/create-user';
import CreateUserAdmin from '../../application/use-cases/create-user-admin';
import UpdateUser from '../../application/use-cases/update-user';
import UpdateEstablishment from '../../application/use-cases/update-establishiment';
import UpdateReservation from '../../application/use-cases/update-reservation';
import RepositoryFactory from '../../domain/repositories/repository-factory';
import HttpServer from './http-server';
import GetEstablishments from '../../application/use-cases/get-establishiments';

export default class Router {
  constructor(http: HttpServer, repositoryFactory: RepositoryFactory) {
    const userRepository = repositoryFactory.createUserRepository();
    const establishmentRepository =
      repositoryFactory.createEstablishimentRepository();
    const createUser = new CreateUser(userRepository);
    const createUserAdmin = new CreateUserAdmin(userRepository);
    const editUser = new UpdateUser(userRepository);
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
    const getEstablishment = new GetEstablishments();

    http.on('post', '/createUser', function (params: any, body: any) {
      return createUser.execute(body);
    });

    http.on('post', '/createUserAdmin', function (params: any, body: any) {
      return createUserAdmin.execute(body);
    });

    http.on('put', '/updateUser', function (params: any, body: any) {
      return editUser.execute(body);
    });

    http.on('put', '/updateEstablishment', function (params: any, body: any) {
      return updateEstablishment.execute(body);
    });

    http.on('put', '/updateReservation', function (params: any, body: any) {
      return updateReservation.execute(body);
    });

    http.on('post', '/createReservation', function (params: any, body: any) {
      return createReservation.execute(body);
    });
  }
}
