import EstablishmentRepository from '../../domain/repositories/establishment-repository';
import ReservationRepository from '../../domain/repositories/reservation-repository';

export default class CancelReservation {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    private readonly establishmentRepository: EstablishmentRepository
  ) {}

  async execute(input: Input) {
    const reservation = await this.reservationRepository.getById(input.id);
    const establishment = await this.establishmentRepository.getById(
      reservation.establishmentId
    );
    establishment.cancelReservation(reservation);
    await this.reservationRepository.delete(reservation);
    return 'sucess';
  }
}

type Input = {
  id: string;
};
