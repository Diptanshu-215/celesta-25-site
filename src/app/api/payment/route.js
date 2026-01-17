
import { encrypt, decrypt, generateSignature } from "@/lib/nttpay";
import { NextResponse } from "next/server";

const merchId = process.env.NEXT_PUBLIC_MERCHANT_ID;
const merchPass = process.env.MERCHANT_PASSWORD;
const prodId = process.env.PRODUCT_ID;
const Authurl = process.env.ATOM_AUTH_URL;

export async function POST(req) {
    try {
        const body = await req.json();
        console.log("Payment POST request received", body);

        // Dynamic Transaction details
        let txnId = "TXN" + Date.now();
        let txnDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
        let amount = body.amount || "30.00";
        let userEmailId = body.email || "test.user@atomtech.in";
        let userContactNo = body.contact || "8888888888"; // User contact is required

        const jsondata = `{
      "payInstrument": {
        "headDetails": {
          "version": "OTSv1.1",
          "api": "AUTH",
          "platform": "FLASH"
        },
        "merchDetails": {
          "merchId": "${merchId}",
          "userId": "",
          "password": "${merchPass}",
          "merchTxnId": "${txnId}",
          "merchTxnDate": "${txnDate}"
        },
        "payDetails": {
          "amount": "${amount}",
          "product": "${prodId}",
          "custAccNo": "213232323",
          "txnCurrency": "INR"
        },
        "custDetails": {
          "custEmail": "${userEmailId}",
          "custMobile": "${userContactNo}"
        },
        "extras": {
          "udf1": "${body.orderId || ''}",
          "udf2": "udf2",
          "udf3": "udf3",
          "udf4": "udf4",
          "udf5": "udf5"
        }
      }
    }`;

        // const JSONString = jsondata.toString();
        // console.log("JSONString created:", JSONString);
        let encDataR = encrypt(jsondata);
        // console.log("Encrypted data ready for sending:", encDataR);

        // Encode special characters in body
        const formBody = new URLSearchParams({
            encData: encDataR,
            merchId: merchId,
        });

        const response = await fetch(Authurl, {
            method: "POST",
            headers: {
                "cache-control": "no-cache",
                "content-type": "application/x-www-form-urlencoded",
            },
            body: formBody,
        });

        // console.log("Request sent to:", Authurl);
        // console.log("Merchant ID used:", merchId);

        if (response.status !== 200) {
            const errorText = await response.text();
            console.error(`Gateway returned ${response.status}. Body: ${errorText}`);
            return NextResponse.json({ error: `Gateway Error ${response.status}: ${errorText.substring(0, 100)}...` }, { status: 502 });
        }

        const datas = await response.text();
        // console.log("RAW RESPONSE BODY:", datas);

        if (datas.includes("<html") || !datas.includes("&")) {
            console.error("Invalid response received from Payment Gateway (possibly 503 or HTML error).");
            return NextResponse.json({ error: "Invalid response from Payment Gateway. Service may be down or URL incorrect." }, { status: 502 });
        }

        var arr = datas.split("&").map((val) => val);
        var arrTwo = arr[1].split("=").map((val) => val);

        if (!arrTwo || arrTwo.length < 2) {
            throw new Error("Failed to parse encrypted data from response");
        }

        var decrypted_data = decrypt(arrTwo[1]);
        // console.log("Decrypted data:", decrypted_data);

        let jsonData = JSON.parse(decrypted_data);

        if (jsonData["responseDetails"]["txnStatusCode"] === "OTS0000") {
            console.log("Transaction initiated successfully");
            return NextResponse.json({
                token: jsonData["atomTokenId"],
                txnId: txnId,
                merchId: merchId,
            });
        } else {
            console.log(
                "Transaction failed with status code:",
                jsonData["responseDetails"]["txnStatusCode"]
            );
            return NextResponse.json({
                error: jsonData["responseDetails"]["txnStatusCode"],
            }, { status: 400 });
        }

    } catch (error) {
        console.error("Error in payment route:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
