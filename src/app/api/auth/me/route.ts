
import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken } from '@/lib/auth';
import { users } from '../../data/users';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  if (!accessToken) {
    return NextResponse.json({ error: 'No accessToken provided' }, { status: 401 });
  }

  const userData = await verifyAccessToken(accessToken);
  if (!userData) {
    return NextResponse.json({ error: 'Invalid accessToken' }, { status: 401 });
  }

  console.log(userData)
  const user = users.find((u) => u.id === userData.id);

  return NextResponse.json(user);
}
