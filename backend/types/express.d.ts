import * as express from 'express';
import 'express-session';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

declare module 'express-session' {
  interface Session {
    token: string;
  }
}
