import { NextRequest, NextResponse } from 'next/server';
export async function POST(request: NextRequest) {
	try {
		const { accessToken, refreshToken } = await request.json();

		if (!accessToken) {
			const loginUrl = new URL('/auth', request.url);
			loginUrl.searchParams.set('from', request.nextUrl.pathname);
			NextResponse.json({ error: 'access 토큰이 없습니다.' }, { status: 400 });
			return NextResponse.redirect(loginUrl);
		}

		const response = NextResponse.json({ message: '토큰 저장 완료!' });

		// ✅ `HttpOnly` 쿠키로 Access Token 저장
		response.headers.set('Set-Cookie', `access_token=${accessToken}; Path=/; HttpOnly; Secure; SameSite=Lax`);
		// (await cookies())
		// 	.set(
		// 		'access_token',
		// 		accessToken
		// 	)(await cookies())
		// 	.set('refresh_token', refreshToken);
		if (refreshToken) {
			response.headers.append(
				'Set-Cookie',
				`refresh_token=${refreshToken}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000`
			);
		}

		return response;
	} catch (error) {
		return NextResponse.json({ error: '서버 오류 발생' }, { status: 500 });
	}
}
