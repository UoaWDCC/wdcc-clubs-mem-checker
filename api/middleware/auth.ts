import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export default function auth(req: Request, res: Response, next: Function) {
  const authHeader: string | undefined = req.header('Authorization');

  const token: string | undefined = authHeader?.slice(7);
  if (!token) return res.status(400).send('Unauthorized');

  const JWT_SECRET = process.env.JWT_SECRET!;

  verify(token!, JWT_SECRET, (err: any, decoded: any) => {
    if (err) return res.status(400).send('Invalid Token');
    req.body.user = decoded;
  });

  return next();
}

export function maybeAuth(req: Request, res: Response, next: Function) {
  const authHeader: string | undefined = req.header('Authorization');

  const token: string | undefined = authHeader?.slice(7);
  if (!token) return next();

  const JWT_SECRET = process.env.JWT_SECRET!;

  verify(token!, JWT_SECRET, (err: any, decoded: any) => {
    if (err) return next();
    req.body.user = decoded;
  });

  return next();
}
