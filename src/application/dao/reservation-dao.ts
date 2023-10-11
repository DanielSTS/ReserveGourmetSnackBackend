export type ReservationDto = {
  id: string;
  userId: string;
  userName?: string;
  establishmentId: string;
  category: string;
  establishmentName: string;
  datetime: Date;
  numPeople: number;
  observation: string;
};

export default interface ReservationDao {
  listByUserId(userId: string): Promise<ReservationDto[]>;
  listByOwnerId(ownerId: string): Promise<ReservationDto[]>;
  listByEstablishmentId(establishmentId: string): Promise<ReservationDto[]>;
}
