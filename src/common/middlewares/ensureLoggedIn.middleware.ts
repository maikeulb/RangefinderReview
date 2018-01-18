import { Middleware, NestMiddleware, ExpressMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Middleware()
export class EnsureLoggedInMiddleware implements NestMiddleware {
  resolve(): ExpressMiddleware {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!req.isAuthenticated || !req.isAuthenticated()) {
        if (req.session) {
          req.session.returnTo = req.originalUrl || req.url; // eslint-disable-line no-param-reassign
        }
        return res.redirect('/account/login');
      }
      next();
    };
  }
}
