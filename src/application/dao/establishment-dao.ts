export type EstablishmentDto = {
  id: string;
  name: string;
  ownerName?: string;
  phone: string;
  openingHoursStart: Date;
  openingHoursEnd: Date;
  address: string;
  category: string;
  maxCapacity: number;
};

export default interface EstablishmentDao {
  list(): Promise<EstablishmentDto[]>;
  getByOwnerId(id: string): Promise<EstablishmentDto>;
}
