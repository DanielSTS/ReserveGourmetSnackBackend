import CreateReview from '../../src/application/use-cases/create-review';
import Establishment from '../../src/domain/entities/establishment';
import User from '../../src/domain/entities/user';
import PgPromiseConnectionAdapter from '../../src/infra/database/pg-promise-adapter';
import EstablishmentRepositoryDatabase from '../../src/infra/repositories/establishment-repository-database';
import ReviewRepositoryDatabase from '../../src/infra/repositories/review-repository-database';
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

test('Deve criar um review', async () => {
  const establishmentRepository = new EstablishmentRepositoryDatabase(instance);
  const userRepository = new UserRepositoryDatabase(instance);
  const reviewRepository = new ReviewRepositoryDatabase(instance);

  const createReview = new CreateReview(
    establishmentRepository,
    userRepository,
    reviewRepository
  );

  const user = await User.create(
    'User Name',
    'user.review@example.com',
    'password'
  );
  await userRepository.save(user);

  const userOwner = await User.create(
    'User Name Owner',
    'user.owner.review@example.com',
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

  await expect(async () => {
    await createReview.execute({
      establishmentId,
      userId: user.id,
      rating: 4,
      comment: 'comment'
    });
  }).not.toThrow();
});
