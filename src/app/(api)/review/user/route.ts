import { NextResponse } from "next/server";

// Redirect /review/user to /review
export async function GET() {
    return NextResponse.redirect(new URL("/review", process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'));
}
