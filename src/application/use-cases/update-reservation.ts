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
      reservation.establishmentId
    );
    const updatedeReservation = establishment.updateReservartion(
      reservation,
      new Date(input.datetime),
      input.numPeople,
      input.observation
    );
    await this.reservationRepository.update(updatedeReservation);
    return 'sucess';
  }
}

type Input = {
  id: string;
  datetime: Date;
  numPeople: number;
  observation: string;
};
