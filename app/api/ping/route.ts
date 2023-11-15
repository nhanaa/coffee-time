import { transporter } from '@/config/nodemailer';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, subject, message } = await request.json();

    if (!email || !subject || !message) {
      console.log("Bad request:", email, subject, message);
      return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }

    await transporter.sendMail({
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject,
      text: message
    });

    return NextResponse.json({ message: "Email sent" }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
