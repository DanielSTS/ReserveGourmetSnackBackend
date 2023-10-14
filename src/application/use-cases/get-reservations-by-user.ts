import ReservationDao, { ReservationDto } from '../daos/reservation-dao';

export default class GetReservationsByUser {
  constructor(private readonly reservationDao: ReservationDao) {}

  async execute(input: Input): Promise<ReservationDto[]> {
    return this.reservationDao.listByUserId(input.userId);
  }
}

type Input = {
  userId: string;
};
