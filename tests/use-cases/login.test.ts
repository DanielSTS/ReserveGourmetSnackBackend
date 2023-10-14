import Login from '../../src/application/use-cases/login';
import User from '../../src/domain/entities/user';
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

test('Deve fazer um login com credenciais válidas', async function () {
  const userRepository = new UserRepositoryDatabase(instance);
  await userRepository.save(
    await User.create('User Name', 'user.login@email.com', 'password')
  );
  const login = new Login(userRepository);
  const input = {
    email: 'user.login@email.com',
    password: 'password'
  };
  const output = await login.execute(input);
  expect(output.token).toBeDefined();
});
