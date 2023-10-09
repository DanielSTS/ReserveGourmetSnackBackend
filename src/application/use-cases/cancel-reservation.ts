import EstablishmentRepository from '../../domain/repositories/establishiment-repository';
import UserRepository from '../../domain/repositories/user-repository';

export default class CancelReservation {
  constructor(
    private readonly establishmentRepository: EstablishmentRepository,
    private readonly userRepository: UserRepository
  ) {}

  async execute(input: Input) {
    const user = await this.userRepository.getByEmail(input.email);
    const establishiment = await this.establishmentRepository.getById(
      input.establishmentId
    );
    establishiment.cancelReservation(user.email);
    await this.establishmentRepository.save(establishiment);
  }
}

type Input = {
  email: string;
  establishmentId: string;
};
