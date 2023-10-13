import { Request, Response, NextFunction } from 'express';
import TokenGenerator from '../../domain/entities/token-generator';

interface CustomRequest extends Request {
  userId?: string;
}

export default function AuthenticateMiddleware(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.headers['authorization'];

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Authentication token not provided' });
  }

  try {
    const decoded = TokenGenerator.verify(token);
    req.userId = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token authentication failed' });
  }
}
