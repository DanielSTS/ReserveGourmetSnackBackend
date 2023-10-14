import SendEmailService from '../../src/application/services/send-email-service';
import CreateReservation from '../../src/application/use-cases/create-reservation';
import Establishment from '../../src/domain/entities/establishment';
import User from '../../src/domain/entities/user';
import PgPromiseConnectionAdapter from '../../src/infra/database/pg-promise-adapter';
import EstablishmentRepositoryDatabase from '../../src/infra/repositories/establishment-repository-database';
import ReservationRepositoryDatabase from '../../src/infra/repositories/reservation-repository-database';
import UserRepositoryDatabase from '../../src/infra/repositories/user-repository-database';
import { randomUUID } from 'crypto';

let instance: PgPromiseConnectionAdapter;

beforeAll(async () => {
  instance = PgPromiseConnectionAdapter.getInstance();
});

afterAll(async () => {
  await instance.clear();
  await instance.close();
});

function makeEmailService(): SendEmailService {
  return {
    sendEmail: jest.fn()
  };
}

test('Deve criar uma reserva', async () => {
  const reservationRepository = new ReservationRepositoryDatabase(instance);
  const establishmentRepository = new EstablishmentRepositoryDatabase(instance);
  const userRepository = new UserRepositoryDatabase(instance);
  const sendEmailService = makeEmailService();

  const createReservation = new CreateReservation(
    establishmentRepository,
    userRepository,
    reservationRepository,
    sendEmailService
  );

  const user = await User.create(
    'User Name',
    'user.reservation@example.com',
    'password'
  );
  await userRepository.save(user);

  const userOwner = await User.create(
    'User Name Owner',
    'user.owner.reservation@example.com',
    'password'
  );
  await userRepository.saveOwner(userOwner);

  const start = new Date();
  start.setHours(9);
  start.setMinutes(0);

  const end = new Date();
  end.setHours(17);
  end.setMinutes(30);

  const establishmentId = randomUUID();
  const establishment = new Establishment(
    userOwner.id,
    establishmentId,
    'Acme Hotel',
    'phone',
    start,
    end,
    'address',
    'category',
    50,
    true
  );

  await establishmentRepository.save(establishment);

  const reservationTime = new Date();
  reservationTime.setHours(13);
  reservationTime.setMinutes(45);

  const result = await createReservation.execute({
    establishmentId,
    userId: user.id,
    datetime: reservationTime,
    numPeople: 5,
    observation: 'observation'
  });

  expect(result).toBe('sucess');

  expect(sendEmailService.sendEmail).toHaveBeenCalledWith(
    'user.owner.reservation@example.com',
    'Nova reserva',
    'Uma nova reserva foi feita para o estabelecimento Acme Hotel.'
  );

  const output = await reservationRepository.getById(result);
  expect(output).toBeDefined();
});
