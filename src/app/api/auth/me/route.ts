
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { users } from '../../data/users';

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }

  const userData = verifyToken(token);
  if (!userData) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  const user = users.find((u) => u.id === userData.id);

  return NextResponse.json(user);
}
