import User from '../entities/user';

export default interface UserRepository {
  save(user: User): Promise<void>;
  saveOwner(user: User): Promise<void>;
  update(user: User): Promise<void>;
  getByEmail(email: string): Promise<User>;
  getOwnerByEmail(email: string): Promise<User>;
  getById(id: string): Promise<User>;
}
