import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const otpStore = new Map(); // email -> otp

export async function POST(req) {
  const { email,otp } = await req.json();

  

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
  from: `"Celesta – IIT Patna" <${process.env.GMAIL_USER}>`,
  to: email,
  subject: "Your One-Time Password (OTP) for Registration",
  html: `
    <div style="font-family: Arial, Helvetica, sans-serif; background-color:#f9fafb; padding:24px;">
      <div style="max-width:520px; margin:auto; background:#ffffff; padding:28px; border-radius:8px; border:1px solid #e5e7eb;">
        
        <h2 style="color:#4f46e5; margin-bottom:16px;">Celesta – IIT Patna</h2>

        <p style="font-size:15px; color:#111827;">Dear User,</p>

        <p style="font-size:15px; color:#111827;">
          Thank you for registering with <strong>Celesta</strong>.
          Please use the following One-Time Password (OTP) to complete your registration:
        </p>

        
        <div style="
          font-size:32px;
          font-weight:700;
          letter-spacing:6px;
          text-align:center;
          margin:24px 0;
          color:#111827;
        ">
          ${otp}
        </div>

        <p style="font-size:14px; color:#374151;">
          This OTP is valid for <strong>5 minutes</strong>.
          For security reasons, please do not share this code with anyone.
        </p>

        <p style="font-size:14px; color:#374151;">
          If you did not initiate this request, you can safely ignore this email.
        </p>

        <hr style="margin:24px 0; border:none; border-top:1px solid #e5e7eb;" />

        <p style="font-size:13px; color:#6b7280;">
          Best regards,<br />
          <strong>Team Celesta</strong><br />
          IIT Patna
        </p>

      </div>
    </div>
  `,
});


  return NextResponse.json({ success: true });
}

export { otpStore };
