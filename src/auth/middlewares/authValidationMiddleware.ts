import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { NextFunction, Response } from 'express';
import { AuthValidate } from '../dto/validate-auth.dto';

@Injectable()
export class AuthValidationMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    const login = new AuthValidate();
    const errors = [];

    Object.keys(body).forEach((key) => {
      login[key] = body[key];
    });

    try {
      await validateOrReject(login);
    } catch (errs) {
      errs.forEach((err) => {
        Object.values(err.constraints).forEach((constraint) =>
          errors.push(constraint),
        );
      });
    }

    if (errors.length) {
      throw new BadRequestException(errors);
    }

    next();
  }
}
