import { NextResponse } from "next/server";
import { adminAuth, adminFirestore } from "@/lib/firebaseAdmin";
import { invoiceSchema } from "@/lib/schemas";
import { Timestamp } from "firebase-admin/firestore";

export async function POST(request) {
  try {
    const body = await request.json();
    //const parsed = invoiceSchema.safeParse(body);
    const parsed = (body);
    // if (!parsed.success) {
    //   return NextResponse.json(
    //     { error: "Invalid request", details: parsed.error.errors },
    //     { status: 400 }
    //   );
    // }

    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'content-type': 'application/json' },
      });
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = await adminAuth.verifyIdToken(token)
    if (!decodedToken) return NextResponse.json({ error: 'Unauthorized' })
    const uid = decodedToken.uid;
    const db = adminFirestore;
    console.log(parsed)
    let fest_pass_claimed = false;
    parsed.cart.forEach(async item => {
     if((item.id == "FEST_PASS" || item.type == "event") && !fest_pass_claimed) {
       // allocate pass for user
      const userDocRef = db.collection('users').doc(uid);
      const userDoc = await userDocRef.get();
      await userDocRef.update({
        qrEnabled: true,
      });
      fest_pass_claimed = true;
     }
    });
    const docRef = await db.collection("invoices").add({
      // ...parsed.data,
      ...parsed,
      createdAt: Timestamp.now(),
      uid: uid,
    });

    return NextResponse.json({ success: true, id: docRef.id }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

