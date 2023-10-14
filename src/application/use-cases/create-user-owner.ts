import User from '../../domain/entities/user';
import UserRepository from '../../domain/repositories/user-repository';

export default class CreateUserOwner {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: Input) {
    const existingUser = await this.userRepository
      .getOwnerByEmail(input.email)
      .catch(() => undefined);
    if (existingUser) {
      throw new Error('Email is already registered.');
    }

    const userOwner = await User.create(
      input.name,
      input.email,
      input.password
    );
    await this.userRepository.saveOwner(userOwner);
    return userOwner.id;
  }
}

type Input = {
  name: string;
  email: string;
  password: string;
};
