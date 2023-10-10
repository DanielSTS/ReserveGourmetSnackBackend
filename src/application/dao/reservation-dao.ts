export type ReservationDto = {
  id: string;
  establishmentId: string;
  datetime: Date;
  numPeople: number;
  observation: string;
};

export default interface ReservationDao {
  listByUserId(userId: string): Promise<ReservationDto[]>;
  listByEstablishmentId(establishimentId: string): Promise<ReservationDto[]>;
}
