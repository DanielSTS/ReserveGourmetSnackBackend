import User from '../../../domain/entities/user';
import UserRepository from '../../../domain/repositories/user-repository';
import Connection from '../connection';

export default class UserRepositoryDatabase implements UserRepository {
  private users: User[] = [];

  constructor (readonly connection: Connection) {
	}

  async save(user: User): Promise<void> {
    this.users.push(user);
  }

  async list(): Promise<User[]> {
    return this.users;
  }

  async getByEmail(email: string): Promise<User> {
    const user = this.users.find(user => user.email.value === email);
    if (!user) {
      throw new Error('User not found.');
    }
    return user;
  }
}
