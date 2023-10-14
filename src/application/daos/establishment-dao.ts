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
  enabled: boolean;
  rating: number;
  reviews: ReviewDto[];
};

export type ReviewDto = {
  establishmentId: string;
  id: string;
  rating: number;
  comment: string;
};

export default interface EstablishmentDao {
  list(): Promise<EstablishmentDto[]>;
  getByOwnerId(id: string): Promise<EstablishmentDto>;
}
