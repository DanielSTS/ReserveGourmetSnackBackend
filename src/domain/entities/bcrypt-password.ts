import { compare, hash } from 'bcrypt';

export default class BcryptPassword {
  private constructor(
    readonly value: string,
    readonly salt: number
  ) {}

  static async create(password: string): Promise<BcryptPassword> {
    const salt = 10;
    const value = await hash(password, salt);
    return new BcryptPassword(value, salt);
  }

  async validate(password: string): Promise<boolean> {
    const ret = await compare(password, this.value);
    return ret;
  }
}
