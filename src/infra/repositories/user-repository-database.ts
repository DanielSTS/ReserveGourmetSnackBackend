import User from '../../domain/entities/user';
import UserRepository from '../../domain/repositories/user-repository';
import Connection from '../database/connection';

export default class UserRepositoryDatabase implements UserRepository {
  constructor(readonly connection: Connection) {}

  async save(user: User): Promise<void> {
    const query = `
      INSERT INTO public.reserve_user 
        (id, name, email, password)
      VALUES 
        ($1, $2, $3,  $4)`;
    const values = [user.id, user.name, user.email.value, user.password];
    await this.connection.query(query, values);
  }

  async saveOwner(user: User): Promise<void> {
    const query = `
      INSERT INTO public.owner_establishment 
        (id, name, email, password)
      VALUES 
        ($1, $2, $3,  $4)`;
    const values = [user.id, user.name, user.email.value, user.password];
    await this.connection.query(query, values);
  }

  async update(user: User): Promise<void> {
    const query = `
    UPDATE public.reserve_user 
    SET name = $1, password = $2, phone = $3
    WHERE email = $4`;
    const values = [user.name, user.password, user.phone, user.email.value];
    await this.connection.query(query, values);
  }

  async updateOwner(user: User): Promise<void> {
    const query = `
    UPDATE public.owner_establishment 
    SET name = $1, password = $2
    WHERE email = $3`;
    const values = [user.name, user.password, user.email.value];
    await this.connection.query(query, values);
  }

  async getByEmail(email: string): Promise<User> {
    const query = 'SELECT * FROM public.reserve_user WHERE email = $1';
    const values = [email];
    const [result] = await this.connection.query(query, values);
    if (!result) throw new Error('User not found');
    const password = JSON.parse(result.password);
    return User.restore(
      result.id,
      result.name,
      result.email,
      password.value,
      password.salt,
      result.phone
    );
  }

  async getById(id: string): Promise<User> {
    const query = 'SELECT * FROM public.reserve_user WHERE id = $1';
    const values = [id];
    const [result] = await this.connection.query(query, values);
    if (!result) throw new Error('User not found');
    const password = JSON.parse(result.password);
    return User.restore(
      result.id,
      result.name,
      result.email,
      password.value,
      password.salt,
      result.phone
    );
  }

  async getOwnerByEmail(email: string): Promise<User> {
    const query = 'SELECT * FROM public.owner_establishment WHERE email = $1';
    const values = [email];
    const [result] = await this.connection.query(query, values);
    if (!result) throw new Error('User not found');
    const password = JSON.parse(result.password);
    return User.restore(
      result.id,
      result.name,
      result.email,
      password.value,
      password.salt,
      result.phone
    );
  }

  async getOwnerById(id: string): Promise<User> {
    const query = 'SELECT * FROM public.owner_establishment WHERE id = $1';
    const values = [id];
    const [result] = await this.connection.query(query, values);
    if (!result) throw new Error('User not found');
    const password = JSON.parse(result.password);
    return User.restore(
      result.id,
      result.name,
      result.email,
      password.value,
      password.salt,
      result.phone
    );
  }
}
