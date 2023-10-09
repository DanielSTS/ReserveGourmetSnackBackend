export type ReservationDto = {
  id: string;
  email: string;
  establishmentId: string;
  datetime: Date;
  numPeople: number;
  observation: string;
};

export default interface ReservationDao {
  listByEmail(email: string): Promise<ReservationDto[]>;
}
