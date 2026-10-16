import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Verification check for admin demo
    if (email === 'admin@somaro.co.id' && password === 'SomaroMedika2026!') {
      const response = NextResponse.json({
        success: true,
        user: {
          id: 'admin-1',
          email: 'admin@somaro.co.id',
          full_name: 'Dr. Somaro Executive Admin',
          role: 'super_admin',
        },
      });

      response.cookies.set('somaro_demo_auth', 'active-token-somaro-2026', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    }

    return NextResponse.json({ success: false, message: 'Kredensial email atau kata sandi tidak valid.' }, { status: 401 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
