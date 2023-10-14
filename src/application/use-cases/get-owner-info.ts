import EstablishmentDao, { EstablishmentDto } from '../daos/establishment-dao';
import ReservationDao, { ReservationDto } from '../daos/reservation-dao';
import UserDao, { OwnerDto } from '../daos/user-dao';

export default class GetOwnerInfo {
  constructor(
    private readonly userDao: UserDao,
    private readonly estableshmentDao: EstablishmentDao,
    private readonly reservationDao: ReservationDao
  ) {}

  async execute(input: Input): Promise<Output> {
    const owner = await this.userDao.getOwnerById(input.id);
    const establishment = await this.estableshmentDao
      .getByOwnerId(input.id)
      .catch(() => undefined);
    const reservations = await this.reservationDao.listByOwnerId(input.id);
    return {
      owner,
      establishment,
      reservations
    };
  }
}

type Input = {
  id: string;
};

type Output = {
  owner: OwnerDto;
  establishment?: EstablishmentDto;
  reservations: ReservationDto[];
};
