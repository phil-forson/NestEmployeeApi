import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { nextTick } from 'process';

export function logger(req: Request, res: Response, next: NextFunction) {
    console.log(`Request...`);
    next();
  };
