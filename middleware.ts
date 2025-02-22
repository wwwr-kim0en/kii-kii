import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(request: NextRequest) {
	// console.log('middleware:::', request);
	// const allCookies = request.cookies.getAll();
	// const response = NextResponse.next();
	// response.cookies.set('allCookies', JSON.stringify(allCookies));
	// return response;
}
