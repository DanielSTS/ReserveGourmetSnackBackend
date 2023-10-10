import Reservation from '../entities/reservation';

export default interface ReservationRepository {
  save(reservation: Reservation): Promise<void>;
  update(reservation: Reservation): Promise<void>;
  getById(id: string): Promise<Reservation>;
}
