import UpdateEstablishment from '../../src/application/use-cases/update-establishment';
import User from '../../src/domain/entities/user';
import PgPromiseConnectionAdapter from '../../src/infra/database/pg-promise-adapter';
import EstablishmentRepositoryDatabase from '../../src/infra/repositories/establishment-repository-database';
import UserRepositoryDatabase from '../../src/infra/repositories/user-repository-database';

let instance: PgPromiseConnectionAdapter;

beforeAll(async () => {
  instance = PgPromiseConnectionAdapter.getInstance();
});

afterAll(async () => {
  await instance.clear();
  await instance.close();
});

test('Deve atualizar um establishiment', async () => {
  const establishmentRepository = new EstablishmentRepositoryDatabase(instance);
  const userRepository = new UserRepositoryDatabase(instance);

  const updateEstablishment = new UpdateEstablishment(
    userRepository,
    establishmentRepository
  );

  const userOwner = await User.create(
    'User Name Owner',
    'user.owner.update.establishment@example.com',
    'password'
  );
  await userRepository.saveOwner(userOwner);

  const start = new Date();
  start.setHours(9);
  start.setMinutes(0);

  const end = new Date();
  end.setHours(17);
  end.setMinutes(30);

  const result = await updateEstablishment.execute({
    ownerId: userOwner.id,
    establishmentName: 'Acme Hotel',
    password: 'password',
    phone: 'phone',
    openingHoursStart: start,
    openingHoursEnd: end,
    category: 'category',
    maxCapacity: 50,
    address: 'address',
    enabled: true
  });

  expect(result).toBeDefined();

  const output = await establishmentRepository.getById(result);

  expect(output.ownerId).toEqual(userOwner.id);
  expect(output.name).toEqual('Acme Hotel');
  // expect(output.password).toEqual('password', 'password');
  expect(output.phone).toEqual('phone');
  expect(output.openingHoursStart).toEqual(start);
  expect(output.openingHoursEnd).toEqual(end);
  expect(output.category).toEqual('category');
  expect(output.maxCapacity).toEqual(50);
  expect(output.address).toEqual('address');
  expect(output.enabled).toEqual(true);
});
