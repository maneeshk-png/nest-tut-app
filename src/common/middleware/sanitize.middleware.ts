import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class SanitizeMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    if (body && typeof body === 'object' && 'email' in body) {
        body.email = (body.email as string).toLowerCase();
      }
    next();
  }
}
