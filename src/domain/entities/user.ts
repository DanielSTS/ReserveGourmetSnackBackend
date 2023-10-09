import BcryptPassword from './bcrypt-password';
import Email from './email';

export default class User {
  private constructor(
    private readonly name: string,
    readonly email: Email,
    private readonly password: BcryptPassword,
    private phone?: string
  ) {}

  static async create(name: string, email: string, password: string) {
    if (password.length < 8) {
      throw new Error('Password must have at least 8 characters.');
    }
    return new User(
      name,
      new Email(email),
      await BcryptPassword.create(password)
    );
  }

  validatePassword(password: string) {
    return this.password.validate(password);
  }

  updatePhone(phone: string) {
    this.phone = phone;
  }
}
