import CreateUser from '../src/application/use-cases/create-user';
import UserRepositoryInMemory from '../src/infra/repositories/user-repository-in-memory';

test('Deve criar um usuário', async function () {
  const userRepository = new UserRepositoryInMemory();
  const signUp = new CreateUser(userRepository);
  const result = await signUp.execute({
    name: 'Daniel',
    email: 'daniel@email.com',
    password: 'senha123'
  });
  const output = await userRepository.getById(result);
  expect(output).toHaveLength(1);
});
