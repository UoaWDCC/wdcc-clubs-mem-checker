import { Request, Response } from "express";
import { verify } from 'jsonwebtoken';

export default function auth(req: Request, res: Response, next: Function){
    const authHeader = req.headers['authorization'];

    const token: string | undefined = authHeader?.slice(7);
    if (!token) return res.status(400).send('Unauthorized');

    const JWT_SECRET = process.env.JWT_SECRET!;

    try {
        verify(token, JWT_SECRET, (err: any, decoded: any) => {
            if (err) return res.status(400);
            req.body.user = decoded;
        });
    }

    catch {
        return res.status(400);
    }
    return next()
}

