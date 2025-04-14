// app/api/auth/google/callback/route.js

import jwt from "jsonwebtoken";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");

    if (!code) {
        return new Response(JSON.stringify({ error: "No code received" }), {
            status: 400,
        });
    }

    try {
        // Step 1: Exchange code for tokens
        const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                code,
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                redirect_uri: process.env.GOOGLE_REDIRECT_URI,
                grant_type: "authorization_code",
            }),
        });

        const tokenData = await tokenRes.json();
        const accessToken = tokenData.access_token;

        // Step 2: Get user info
        const userInfoRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const profile = await userInfoRes.json();

        // Step 3: Create JWT
        const user = {
            id: profile.id,
            name: profile.name,
            email: profile.email,
            picture: profile.picture,
        };

        const jwtToken = jwt.sign(user, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        // Step 4: Return token (or set cookie)
        const redirectUrl = new URL('/', request.url);
        redirectUrl.searchParams.set('token', jwtToken);
        redirectUrl.searchParams.set('name', user.name);
        redirectUrl.searchParams.set('email', user.email);
        redirectUrl.searchParams.set('picture', user.picture);

        return Response.redirect(redirectUrl.toString(), 302);

    } catch (error) {
        console.error("OAuth Error:", error);
        return new Response(JSON.stringify({ error: "OAuth failed" }), {
            status: 500,
        });
    }
}
