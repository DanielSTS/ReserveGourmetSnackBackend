import ReservationDao, {
  ReservationDto
} from '../../application/dao/reservation-dao';
import Connection from '../database/connection';

export default class ReservationDaoDatabase implements ReservationDao {
  constructor(readonly connection: Connection) {}
  async listByUserId(userId: string): Promise<ReservationDto[]> {
    const query = 'SELECT * FROM public.reservation WHERE user_id = $1';
    const values = [userId];
    const result = await this.connection.query(query, values);

    const reservations: ReservationDto[] = result.map((row: any) => {
      return {
        id: row.id,
        estableshmentId: row.estableshment_id,
        datetime: row.date,
        time: row.time,
        numPeople: row.numpeople
      };
    });

    return reservations;
  }

  async listByEstableshimentId(
    establishmentId: string
  ): Promise<ReservationDto[]> {
    const query =
      'SELECT * FROM public.reservation WHERE establishment_id = $1';
    const values = [establishmentId];
    const result = await this.connection.query(query, values);

    const reservations: ReservationDto[] = result.map((row: any) => {
      return {
        id: row.id,
        estableshmentId: row.estableshment_id,
        datetime: row.date,
        time: row.time,
        numPeople: row.numpeople
      };
    });

    return reservations;
  }
}
