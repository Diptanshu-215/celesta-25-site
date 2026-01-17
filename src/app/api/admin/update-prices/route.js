
import { NextResponse } from "next/server";
import { adminFirestore } from "@/lib/firebaseAdmin";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const db = adminFirestore;
        console.log("Starting update...");

        // Update Single ticket
        await db.collection('products').doc('FEST_PASS').set({
            name: "Single ticket",
            cost: 649,
            img_src: "https://static.vecteezy.com/system/resources/previews/038/105/929/non_2x/ticket-icon-logo-design-template-vector.jpg",
            type: "ticket"
        }, { merge: true });

        // Update ACCO
        await db.collection('products').doc('FEST_PASS_ACCO').set({
            name: "Single ticket(with accommodation)",
            cost: 1499,
            img_src: "https://static.vecteezy.com/system/resources/previews/038/105/929/non_2x/ticket-icon-logo-design-template-vector.jpg",
            type: "ticket"
        }, { merge: true });

        // Verify
        const pass = await db.collection('products').doc('FEST_PASS').get();
        const acco = await db.collection('products').doc('FEST_PASS_ACCO').get();

        const result = {
            FEST_PASS: pass.data(),
            FEST_PASS_ACCO: acco.data()
        };

        console.log("Update result:", result);

        return NextResponse.json({ success: true, result });
    } catch (error) {
        console.error("Update error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
