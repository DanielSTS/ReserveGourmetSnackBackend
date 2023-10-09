import Reservation from '../entities/reservation';

export default interface ReservationRepository {
  save(reservation: Reservation): Promise<void>;
  list(): Promise<Reservation[]>;
  getByEmail(email: string): Promise<Reservation>;
}
