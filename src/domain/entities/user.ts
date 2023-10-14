import BcryptPassword from './bcrypt-password';
import Email from './email';
import { randomUUID } from 'crypto';

export default class User {
  private constructor(
    readonly id: string,
    private _name: string,
    readonly email: Email,
    private _password: BcryptPassword,
    private _phone?: string
  ) {}

  static async create(name: string, email: string, password: string) {
    User.validateStringPassword(password);
    return new User(
      randomUUID(),
      name,
      new Email(email),
      await BcryptPassword.create(password)
    );
  }

  static async restore(
    id: string,
    name: string,
    email: string,
    value: string,
    salt: number,
    phone?: string
  ) {
    return new User(
      id,
      name,
      new Email(email),
      await BcryptPassword.restore(value, salt),
      phone
    );
  }

  static validateStringPassword(password: string) {
    if (!password || password?.length === 0 || password?.length < 8) {
      throw new Error('Password must have at least 8 characters.');
    }
  }
  validatePassword(password: string) {
    return this._password.validate(password);
  }

  async update(name: string, password: string, phone?: string) {
    User.validateStringPassword(password);
    this._name = name;
    this._password = await BcryptPassword.create(password);
    this._phone = phone;
  }

  get name() {
    return this._name;
  }

  get password() {
    return this._password;
  }

  get phone() {
    return this._phone;
  }
}
