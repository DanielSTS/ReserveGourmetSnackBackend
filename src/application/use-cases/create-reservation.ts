import EstablishmentRepository from '../../domain/repositories/establishment-repository';
import ReservationRepository from '../../domain/repositories/reservation-repository';
import UserRepository from '../../domain/repositories/user-repository';
import SendEmailService from '../services/send-email-service';

export default class CreateReservation {
  constructor(
    private readonly establishmentRepository: EstablishmentRepository,
    private readonly userRepository: UserRepository,
    private readonly reservationRepository: ReservationRepository,
    private readonly sendEmailService: SendEmailService
  ) {}

  async execute(input: Input) {
    const user = await this.userRepository.getById(input.userId);
    const establishment = await this.establishmentRepository.getById(
      input.establishmentId
    );
    const userOwner = await this.userRepository.getOwnerById(
      establishment.ownerId
    );
    const reservation = establishment.createReservation(
      user.id,
      new Date(input.datetime),
      input.numPeople,
      input.observation
    );
    await this.reservationRepository.save(reservation);
    await this.sendEmailService.sendEmail(
      userOwner.email.value,
      'Nova reserva',
      `Uma nova reserva foi feita para o estabelecimento ${establishment.name}.`
    );
    await this.reservationRepository.save(reservation);
    return reservation.id;
  }
}

type Input = {
  userId: string;
  establishmentId: string;
  datetime: Date;
  numPeople: number;
  observation: string;
};
