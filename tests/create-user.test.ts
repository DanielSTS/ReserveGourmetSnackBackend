import CreateUser from '../src/application/use-cases/create-user';
import UserRepositoryInMemory from '../src/infra/repositories/in-memory/user-repository-in-memory';

test('Deve criar um usuário', async function () {
  const userRepository = new UserRepositoryInMemory();
  const signUp = new CreateUser(userRepository);
  await signUp.execute({
    name: 'Daniel',
    email: 'daniel@email.com',
    password: 'senha123'
  });
  const output = await userRepository.list();
  expect(output).toHaveLength(1);
});
