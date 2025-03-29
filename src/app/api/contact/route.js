export async function POST(req) {
    try {
        const { name, subject, email, message } = await req.json(); // Email removed as per request

        const TELEGRAM_BOT_TOKEN = "7430181237:AAEl5eOXoXDT5tFtJRFStr16bNfm6ZORBdI";
        const TELEGRAM_CHAT_ID = "6262549908"; // Your Telegram Chat ID

        const text = `*New Contact Form Submission* 
*Name:* ${name}
*Subject:* ${subject}
*Contact:* ${email}
*Message:* ${message}`;

        const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

        const telegramResponse = await fetch(telegramUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: text,
                parse_mode: "Markdown",
            }),
        });

        if (!telegramResponse.ok) {
            throw new Error("Failed to send message to Telegram");
        }

        return Response.json({ success: true, message: "Message sent to Telegram" }, { status: 200 });

    } catch (error) {
        return Response.json({ success: false, error: "Server Error" }, { status: 500 });
    }
}
