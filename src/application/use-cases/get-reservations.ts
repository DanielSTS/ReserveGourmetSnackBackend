import ReservationDao, { ReservationDto } from '../dao/reservation-dao';

export default class GetReservations {
  constructor(private readonly reservationDao: ReservationDao) {}

  async execute(input: Input): Promise<ReservationDto[]> {
    return this.reservationDao.listByUserId(input.email);
  }
}

type Input = {
  email: string;
};
