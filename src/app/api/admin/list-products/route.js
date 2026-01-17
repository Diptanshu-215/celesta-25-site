
import { NextResponse } from "next/server";
import { adminFirestore } from "@/lib/firebaseAdmin";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const snapshot = await adminFirestore.collection('products').get();
        const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
