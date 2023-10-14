import ReservationDao, { ReservationDto } from '../daos/reservation-dao';

export default class GetReservationsByEstablishment {
  constructor(private readonly reservationDao: ReservationDao) {}

  async execute(input: Input): Promise<ReservationDto[]> {
    return this.reservationDao.listByEstablishmentId(input.establishmentId);
  }
}

type Input = {
  establishmentId: string;
};
