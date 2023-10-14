import { sign, verify } from 'jsonwebtoken';
import User from './user';

export default class TokenGenerator {
  static EXPIRES_IN = 1000000;
  static KEY = (process.env.TOKEN_KEY as string) ?? 'secret';

  static sign(user: User, date: Date) {
    return sign(
      {
        email: user.email.value,
        iat: date.getTime(),
        expiresIn: TokenGenerator.EXPIRES_IN
      },
      TokenGenerator.KEY
    );
  }

  static verify(token: string): any {
    return verify(token, TokenGenerator.KEY);
  }
}
