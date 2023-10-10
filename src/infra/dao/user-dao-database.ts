import UserDao, { UserDto } from '../../application/dao/user-dao';
import Connection from '../database/connection';

export default class UserDaoDatabase implements UserDao {
  constructor(readonly connection: Connection) {}

  async getById(id: string): Promise<UserDto> {
    const query = 'SELECT * FROM public.reserve_user WHERE id = $1';
    const values = [id];
    const [result] = await this.connection.query(query, values);
    if (!result) throw new Error('User not found');
    return {
      id: result.id,
      name: result.name,
      phone: result.phone
    };
  }
}
