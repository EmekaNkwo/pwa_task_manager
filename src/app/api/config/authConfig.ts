import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken';
// Assuming your secret key is stored in an environment variable
const SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET_KEY as string;

export async function verifyToken(req: Request) {
    const token = req.headers.get('Authorization')?.split(' ')[1]; // Bearer TOKEN
    if (!token) {
        return new NextResponse(JSON.stringify({ status: 'failed', message: 'Not Authorized. No token provided.' }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
        });
    }
    try {
        jwt.verify(token, SECRET_KEY);
    } catch (error) {
        return new NextResponse(JSON.stringify({ status: 'failed', message: 'Failed to authenticate token.' }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
        });
    }
}