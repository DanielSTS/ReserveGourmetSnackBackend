import UserRepository from '../../../domain/repositories/user-repository';
import User from '../../../domain/entities/user';

export default class UserRepositoryInMemory implements UserRepository {
  private users: User[] = [];

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
