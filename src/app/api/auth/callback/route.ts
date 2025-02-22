import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
	console.log('request', request);
	const cookieStore = await cookies();
	const accessToken = cookieStore.get('access_token');
	const refreshToken = cookieStore.get('refresh_token');

	console.log('accessToken', accessToken);
	console.log('refreshToken', refreshToken);

	if (!accessToken || !refreshToken) {
		NextResponse.redirect('/auth');
	}

	cookieStore.set('access_token', accessToken, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		path: '/',
		sameSite: 'lax',
	});
	cookieStore.set('refresh_token', refreshToken, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		path: '/',
		sameSite: 'lax',
	});
	// const baseUrl = getBaseUrl();
	const response = NextResponse.redirect('http://localhost:3000' + '/main');
	return response;
}
export async function POST(request: Request) {}
export async function PUT(request: Request) {}
export async function PATCH(request: Request) {}
export async function DELETE(request: Request) {}
export async function HEAD(request: Request) {}
export async function OPTIONS(request: Request) {}
