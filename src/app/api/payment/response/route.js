
import { decrypt, generateSignature } from "@/lib/nttpay";
import { NextResponse } from "next/server";
import { adminFirestore } from "@/lib/firebaseAdmin";

export async function POST(req) {
    try {
        let encData = "";

        // Try parsing as form data first
        try {
            const formData = await req.formData();
            encData = formData.get("encData");
        } catch (e) {
            // fallback
        }

        // If not in formData, check if it was JSON
        if (!encData) {
            try {
                const json = await req.json();
                encData = json.encData;
            } catch (e) { }
        }

        if (!encData) {
            return NextResponse.json({ error: "No encData found" }, { status: 400 });
        }

        const decrypted_data = decrypt(encData);
        console.log("Decrypted payment response", decrypted_data); // Debugging

        let jsonData = JSON.parse(decrypted_data);
        let resArray = Object.keys(jsonData).map((key) => jsonData[key]);

        const statusCode = resArray[0]["responseDetails"]["statusCode"];
        const orderId = resArray[0]["extras"]["udf1"]; // We stored Invoice ID here

        if (statusCode == "OTS0000") {
            console.log("Transaction successful for Order:", orderId);

            if (orderId) {
                const db = adminFirestore;
                const invoiceRef = db.collection('invoices').doc(orderId);
                const invoiceSnap = await invoiceRef.get();

                if (invoiceSnap.exists) {
                    const invoiceData = invoiceSnap.data();
                    const uid = invoiceData.uid;

                    // 1. Update Invoice Status
                    await invoiceRef.update({
                        status: "PAID",
                        paymentDetails: resArray[0] // Store full response for records
                    });

                    // 2. Grant Access (Enable QR)
                    if (uid) {
                        await db.collection('users').doc(uid).update({
                            qrEnabled: true
                        });
                        console.log(`Access granted to user ${uid}`);
                    }
                }
            }

            return NextResponse.redirect(new URL('/success?status=success', req.url));

        } else {
            console.log("Transaction failed:", statusCode);
            // Optional: Update invoice to FAILED
            if (orderId) {
                await adminFirestore.collection('invoices').doc(orderId).update({
                    status: "FAILED"
                });
            }
            return NextResponse.redirect(new URL('/store?status=failed', req.url));
        }
    } catch (error) {
        console.error("Error in payment response:", error);
        return NextResponse.redirect(new URL('/store?status=error', req.url));
    }
}
