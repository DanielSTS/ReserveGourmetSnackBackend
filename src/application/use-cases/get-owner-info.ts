import ReservationDao, { ReservationDto } from '../dao/reservation-dao';

export default class GetOwnerInfo {
  constructor(private readonly reservationDao: ReservationDao) {}

  async execute(input: Input): Promise<Output> {
    const reservations = await this.reservationDao.listByEstablishmentId(
      input.id
    );
    return {
      reservations
    };
  }
}

type Input = {
  id: string;
};

type Output = {
  reservations: ReservationDto[];
};
