import { sign, verify } from 'jsonwebtoken';
import User from './user';

export default class TokenGenerator {
  static EXPIRES_IN = 1000000;
  static key = process.env.TOKEN_KEY as string;

  static sign(user: User, date: Date) {
    return sign(
      {
        email: user.email.value,
        iat: date.getTime(),
        expiresIn: TokenGenerator.EXPIRES_IN
      },
      TokenGenerator.key
    );
  }

  static verify(token: string): any {
    return verify(token, TokenGenerator.key);
  }
}
