// src/app/api/users/route.ts
import { NextResponse } from 'next/server';
import { users } from '../data/users';
import { User } from '@/context/UserContext';


export async function GET() {
    const safeUsers: User[] = users.map(({ password, ...user }) => {
        return { ...user };
    });
    return NextResponse.json(safeUsers);
}
