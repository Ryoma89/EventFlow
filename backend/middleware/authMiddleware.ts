import { expressjwt } from 'express-jwt';
import { Request, Response, NextFunction } from 'express';

const jwtMiddleware = expressjwt({
  secret: process.env.JWT_SECRET as string,
  algorithms: ['HS256'],
  requestProperty: 'user',
  credentialsRequired: true,
  getToken: (req: Request) => {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer ')
    ) {
      return req.headers.authorization.split(' ')[1];
    }
    return req.cookies.token;
  },
});

const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  jwtMiddleware(req, res, (err) => {
    if (err) {
      console.log('Error in JWT middleware:', err);
      return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
  });
};

export default authenticateJWT;
