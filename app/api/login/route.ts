import { NextResponse } from "next/server";

const CLIENT_ID = process.env.ORCID_CLIENT_ID!;
const REDIRECT_URI = "http://localhost:3000/api/callback";

export async function GET() {
  const authUrl = `https://orcid.org/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&scope=/authenticate&redirect_uri=${REDIRECT_URI}`;
  return NextResponse.redirect(authUrl);
}
