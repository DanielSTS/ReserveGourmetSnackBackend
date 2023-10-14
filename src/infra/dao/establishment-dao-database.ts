import EstablishmentDao, {
  EstablishmentDto,
  ReviewDto
} from '../../application/dao/establishment-dao';
import Connection from '../database/connection';

export default class EstablishmentDaoDatabase implements EstablishmentDao {
  constructor(readonly connection: Connection) {}

  async list(): Promise<EstablishmentDto[]> {
    const query = `
      SELECT
        e.*,
        ARRAY_AGG(
          JSON_BUILD_OBJECT(
            'id', r.id,
            'userId', r.user_id,
            'comment', r.comment,
            'rating', r.rating
          )
        ) AS reviews,
        COALESCE(AVG(r.rating), 0) AS rating
      FROM
        public.establishment e
        LEFT JOIN public.review r ON r.establishment_id = e.id
      GROUP BY
        e.id
    `;
    const result = await this.connection.query(query, []);

    const establishments: EstablishmentDto[] = result.map((row: any) => {
      const reviews: ReviewDto[] = row.reviews.map((review: any) => {
        return {
          id: review.id,
          userId: review.user_id,
          comment: review.comment,
          rating: review.rating
        };
      });

      return {
        id: row.id,
        name: row.name,
        phone: row.phone,
        openingHoursStart: row.opening_hours_start,
        openingHoursEnd: row.opening_hours_end,
        address: row.address,
        category: row.category,
        maxCapacity: row.max_capacity,
        enabled: row.enabled,
        reviews: reviews,
        rating: result.rating
      };
    });

    return establishments;
  }

  async getByOwnerId(id: string): Promise<EstablishmentDto> {
    const query = `
    SELECT
    e.*,
    ARRAY_AGG(
      JSON_BUILD_OBJECT(
        'id', r.id,
        'userId', r.user_id,
        'comment', r.comment,
        'rating', r.rating
      )
    ) AS reviews,
    COALESCE(AVG(r.rating), 0) AS rating
  FROM
    public.establishment e
    LEFT JOIN public.review r ON r.establishment_id = e.id
  GROUP BY
    e.id
    `;
    const values = [id];
    const [result] = await this.connection.query(query, values);

    if (!result) throw new Error('Establishment not found');

    const reviews: ReviewDto[] = result.reviews.map((review: any) => {
      return {
        id: review.id,
        userId: review.user_id,
        comment: review.comment,
        rating: review.rating
      };
    });

    const establishment: EstablishmentDto = {
      id: result.id,
      name: result.name,
      phone: result.phone,
      openingHoursStart: result.opening_hours_start,
      openingHoursEnd: result.opening_hours_end,
      address: result.address,
      category: result.category,
      maxCapacity: result.max_capacity,
      enabled: result.enabled,
      reviews,
      rating: result.rating
    };

    return establishment;
  }
}
