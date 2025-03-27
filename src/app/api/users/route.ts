// src/app/api/users/route.ts
import { NextResponse } from 'next/server';
import { users } from '../data/users';
import { User } from '@/context/UserContext';


export async function GET() {
    const safeUsers: User[] = users.map(({ password, ...user }) => {
        console.log(user)
        return { ...user }; // Tworzymy kopię użytkownika bez hasła, ale z rolą
    });
    console.log(safeUsers);
    return NextResponse.json(safeUsers);
}
