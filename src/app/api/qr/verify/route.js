import crypto from "crypto";
import { NextResponse } from "next/server";
import { adminFirestore } from "@/lib/firebaseAdmin";

const QR_SECRET = process.env.QR_SECRET_KEY;

export async function POST(req) {
  try {
    const { payload, sig } = await req.json();

    if (!payload || !sig) {
      return NextResponse.json(
        { valid: false, error: "Invalid QR data" },
        { status: 400 }
      );
    }

    const expectedSig = crypto
      .createHmac("sha256", QR_SECRET)
      .update(JSON.stringify(payload))
      .digest("hex");

    if (expectedSig !== sig) {
      return NextResponse.json(
        { valid: false, error: "Invalid signature" },
        { status: 401 }
      );
    }

    const userDoc = await adminFirestore
      .collection("users")
      .doc(payload.uid)
      .get();

    if (!userDoc.exists) {
      return NextResponse.json(
        { valid: false, error: "User not found" },
        { status: 404 }
      );
    }

    const user = userDoc.data();
    if (
      user.email !== payload.email ||
      user.celestaId !== payload.celestaId
    ) {
      return NextResponse.json(
        { valid: false, error: "Payload mismatch" },
        { status: 403 }
      );
    }

    return NextResponse.json(
      {
        valid: true,
        user: {
          name: user.displayName,
          email: user.email,
          celestaId: user.celestaId,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("QR VERIFY ERROR:", err);
    return NextResponse.json(
      { valid: false, error: "Server error" },
      { status: 500 }
    );
  }
}
