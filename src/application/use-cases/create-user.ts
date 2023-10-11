import User from '../../domain/entities/user';
import UserRepository from '../../domain/repositories/user-repository';

export default class CreateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: Input) {
    const existingUser = await this.userRepository
      .getByEmail(input.email)
      .catch(() => undefined);
    if (existingUser) {
      throw new Error('Email is already registered.');
    }
    const user = await User.create(input.name, input.email, input.password);
    await this.userRepository.save(user);
    return user.id;
  }
}

type Input = {
  name: string;
  email: string;
  password: string;
};
