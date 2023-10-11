import Login from '../src/application/use-cases/login';
import User from '../src/domain/entities/user';
import UserRepositoryInMemory from '../src/infra/repositories/user-repository-in-memory';

test('Deve fazer um login com credenciais válidas', async function () {
  const userRepository = new UserRepositoryInMemory();
  userRepository.save(
    await User.create('daniel', 'daniel@email.com', 'senha123')
  );
  const login = new Login(userRepository);
  const input = {
    email: 'daniel@email.com',
    password: 'senha123'
  };
  const output = await login.execute(input);
  expect(output.token).toBeDefined();
});
