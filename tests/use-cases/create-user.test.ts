import CreateUser from '../../src/application/use-cases/create-user';
import PgPromiseConnectionAdapter from '../../src/infra/database/pg-promise-adapter';
import UserRepositoryDatabase from '../../src/infra/repositories/user-repository-database';

let instance: PgPromiseConnectionAdapter;

beforeAll(async () => {
  instance = PgPromiseConnectionAdapter.getInstance();
});

afterAll(async () => {
  await instance.clear();
  await instance.close();
});

test('Deve criar um usuário', async function () {
  const userRepository = new UserRepositoryDatabase(instance);
  const signUp = new CreateUser(userRepository);
  const result = await signUp.execute({
    name: 'User Name',
    email: 'user.create.user@email.com',
    password: 'password'
  });
  const output = await userRepository.getById(result);
  expect(output).toBeDefined();
});
