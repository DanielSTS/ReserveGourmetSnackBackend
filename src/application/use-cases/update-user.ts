import UserRepository from '../../domain/repositories/user-repository';

export default class UpdateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: Input) {
    const user = await this.userRepository.getByEmail(input.email);
    user.update(input.name, input.password, input.phone);
    await this.userRepository.update(user);
  }
}

type Input = {
  name: string;
  password: string;
  phone: string;
  email: string;
};
