import User from '../entities/user';

export default interface UserRepository {
  save(user: User): Promise<void>;
  list(): Promise<User[]>;
  getByEmail(email: string): Promise<User>;
}
