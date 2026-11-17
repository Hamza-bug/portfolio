import { NextRequest, NextResponse } from "next/server";

const emailServiceConfigured = Boolean(process.env.CONTACT_EMAIL);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body ?? {};

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: "Please fill in all required fields." },
        { status: 400 },
      );
    }

    if (!emailServiceConfigured) {
      return NextResponse.json(
        {
          message:
            "The contact form is enabled but no email backend is configured yet. Add CONTACT_EMAIL and a provider to enable real submissions.",
        },
        { status: 501 },
      );
    }

    return NextResponse.json({
      message: "Your message was sent successfully. Configure the backend to receive it in production.",
    });
  } catch {
    return NextResponse.json(
      { message: "There was a problem processing your message." },
      { status: 500 },
    );
  }
}
