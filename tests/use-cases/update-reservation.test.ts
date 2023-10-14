import UpdateReservation from '../../src/application/use-cases/update-reservation';
import Establishment from '../../src/domain/entities/establishment';
import Reservation from '../../src/domain/entities/reservation';
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

test('Deve atualizar uma reserva', async () => {
  const reservationRepository = new ReservationRepositoryDatabase(instance);
  const establishmentRepository = new EstablishmentRepositoryDatabase(instance);
  const userRepository = new UserRepositoryDatabase(instance);

  const updateReservation = new UpdateReservation(
    establishmentRepository,
    reservationRepository
  );

  const user = await User.create(
    'User Name',
    'user.update.reservation@example.com',
    'password'
  );
  await userRepository.save(user);

  const userOwner = await User.create(
    'User Name Owner',
    'user.owner.update.reservation@example.com',
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

  const reservationId = randomUUID();
  const reservationTime = new Date();
  reservationTime.setHours(13);
  reservationTime.setMinutes(45);
  const reservation = new Reservation(
    user.id,
    establishmentId,
    reservationId,
    reservationTime,
    5,
    'observation'
  );
  await reservationRepository.save(reservation);

  const result = await updateReservation.execute({
    id: reservationId,
    datetime: reservationTime,
    numPeople: 4,
    observation: 'new observation'
  });

  expect(result).toEqual('sucess');

  const output = await reservationRepository.getById(reservationId);

  expect(output.datetime).toEqual(reservationTime);
  expect(output.numPeople).toEqual(4);
  expect(output.observation).toEqual('new observation');
});
