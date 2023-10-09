export type EstablishmentDto = {
  id: string;
  email: string;
  name: string;
  phone: string;
  openingHoursStart: Date;
  openingHoursEnd: Date;
  address: string;
  category: string;
};

export default interface EstablishmentDao {
  list(): Promise<EstablishmentDto[]>;
}
