import ReservationDao, {
  ReservationDto
} from '../../application/dao/reservation-dao';

export default class ReservationDaoInMemory implements ReservationDao {
  private establishments: ReservationDto[] = [];

  async listByUserId(email: string): Promise<ReservationDto[]> {
    return this.establishments.filter(e => e.email === email);
  }

  async list(): Promise<ReservationDto[]> {
    return this.establishments;
  }
}
