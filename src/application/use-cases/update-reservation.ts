import EstablishmentRepository from '../../domain/repositories/establishment-repository';
import ReservationRepository from '../../domain/repositories/reservation-repository';

export default class UpdateReservation {
  constructor(
    private readonly establishmentRepository: EstablishmentRepository,
    private readonly reservationRepository: ReservationRepository
  ) {}

  async execute(input: Input) {
    const reservation = await this.reservationRepository.getById(input.id);
    const establishment = await this.establishmentRepository.getById(
      input.establishmentId
    );
    const updatedeReservation = establishment.updateReservartion(
      reservation,
      input.datetime,
      input.numPeople,
      input.observation
    );
    await this.reservationRepository.update(updatedeReservation);
  }
}

type Input = {
  id: string;
  establishmentId: string;
  datetime: Date;
  numPeople: number;
  observation: string;
};
