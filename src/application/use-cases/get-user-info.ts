import ReservationDao, { ReservationDto } from '../dao/reservation-dao';
import UserDao, { UserDto } from '../dao/user-dao';

export default class GetUserInfo {
  constructor(
    private readonly userDao: UserDao,
    private readonly reservationDao: ReservationDao
  ) {}

  async execute(input: Input): Promise<Output> {
    const reservations = await this.reservationDao.listByUserId(input.id);
    const userInfo = await this.userDao.getById(input.id);
    return {
      reservations,
      userInfo
    };
  }
}

type Input = {
  id: string;
};

type Output = {
  userInfo: UserDto;
  reservations: ReservationDto[];
};
