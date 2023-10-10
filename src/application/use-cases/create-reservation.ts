import EstablishmentRepository from '../../domain/repositories/establishment-repository';
import ReservationRepository from '../../domain/repositories/reservation-repository';
import UserRepository from '../../domain/repositories/user-repository';

export default class CreateReservation {
  constructor(
    private readonly establishmentRepository: EstablishmentRepository,
    private readonly userRepository: UserRepository,
    private readonly reservationRepository: ReservationRepository
  ) {}

  async execute(input: Input) {
    const user = await this.userRepository.getByEmail(input.email);
    const establishment = await this.establishmentRepository.getById(
      input.establishmentId
    );
    const reservation = establishment.createReservation(
      user.id,
      input.datetime,
      input.numPeople,
      input.observation
    );
    await this.reservationRepository.save(reservation);
  }
}

type Input = {
  email: string;
  establishmentId: string;
  datetime: Date;
  numPeople: number;
  observation: string;
};
