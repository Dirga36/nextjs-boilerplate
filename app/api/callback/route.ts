import { NextRequest, NextResponse } from "next/server";

const CLIENT_ID = process.env.ORCID_CLIENT_ID!;
const CLIENT_SECRET = process.env.ORCID_CLIENT_SECRET!;
const REDIRECT_URI = "https://nextjs-boilerplate-one-orcin-37.vercel.app/api/callback";

export async function GET(req: NextRequest) {
    const code = req.nextUrl.searchParams.get("code");

    if (!code) {
        return NextResponse.json({ error: "Missing code parameter" }, { status: 400 });
    }

    try {
        // Step 2: Exchange code for access token
        const tokenRes = await fetch("https://orcid.org/oauth/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                code,
                redirect_uri: REDIRECT_URI,
                grant_type: "authorization_code",
            }),
        });

        const tokenData = await tokenRes.json();
        const accessToken = tokenData.access_token;
        const orcidId = tokenData.orcid;

        if (!accessToken) {
            return NextResponse.json({ error: "Failed to get access token", tokenData }, { status: 500 });
        }

        // Step 3: Fetch ORCID profile (replace ID with actual ORCID from token if dynamic)
        const profileRes = await fetch("https://orcid.org/${orcidId}", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/json",
            },
        });

        const profile = await profileRes.json();

        return NextResponse.json(profile);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
