import UserRepository from '../../domain/repositories/user-repository';
import User from '../../domain/entities/user';

export default class UserRepositoryInMemory implements UserRepository {
  private users: User[] = [];

  saveOwner(user: User): Promise<void> {
    throw new Error('Method not implemented.');
  }
  update(user: User): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getOwnerByEmail(email: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  getOwnerById(id: string): Promise<User> {
    throw new Error('Method not implemented.');
  }

  async getById(id: string): Promise<User> {
    const user = this.users.find(user => user.id === id);
    if (!user) {
      throw new Error('User not found.');
    }
    return user;
  }

  async save(user: User): Promise<void> {
    this.users.push(user);
  }

  async getByEmail(email: string): Promise<User> {
    const user = this.users.find(user => user.email.value === email);
    if (!user) {
      throw new Error('User not found.');
    }
    return user;
  }
}
