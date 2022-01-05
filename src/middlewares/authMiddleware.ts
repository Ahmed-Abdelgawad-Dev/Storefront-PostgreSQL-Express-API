import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
dotenv.config()

const { TOKEN_SECRET } = process.env

interface Error {
    status?: number;
    data?: string;
    message?: string;
    stack?: string;
}

const authError = (next: NextFunction) => {
  const error: Error = new Error('Login Error, Please login again');
  error.status = 401;
  next(error);
};

const authMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const header = req.headers.authorization
    if (header) {
      const bearer = header.split(' ')[0].toLowerCase();
      const token = header.split(' ')[1];
      if (token && bearer === 'bearer') {
        const decoded = jwt.verify(token, TOKEN_SECRET as unknown as string);
        if (decoded) {
          next();
        } else {
          authError(next);
        }
      } else {
        authError(next);
      }
    } else {
      authError(next);
    }
  }
  catch (err) {
    authError(next);
    return
  }
};

export default authMiddleware
