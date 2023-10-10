import EstablishmentRepository from '../../domain/repositories/establishment-repository';
import UserRepository from '../../domain/repositories/user-repository';

export default class CreateReservation {
  constructor(
    private readonly establishmentRepository: EstablishmentRepository,
    private readonly userRepository: UserRepository
  ) {}

  async execute(input: Input) {
    const user = await this.userRepository.getByEmail(input.email);
    const establishment = await this.establishmentRepository.getById(
      input.establishmentId
    );
    establishment.createReservation(
      user.email,
      input.datetime,
      input.numPeople,
      input.observation
    );
    await this.establishmentRepository.save(establishment);
  }
}

type Input = {
  email: string;
  establishmentId: string;
  datetime: Date;
  numPeople: number;
  observation: string;
};
