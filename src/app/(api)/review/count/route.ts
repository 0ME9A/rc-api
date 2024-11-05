import { NextResponse } from "next/server";
import clientPromise from "@/server/connect";

export async function GET() {
    const db_name = process.env.DB_NAME;

    try {
        const client = await clientPromise;
        const db = client.db(db_name);
        const totalDocuments = await db.collection("testimonials").countDocuments();

        return NextResponse.json({ success: true, total: totalDocuments });
    } catch (error) {
        console.error("Error counting documents:", error);
        return NextResponse.json(
            { error: "Error counting documents", success: false },
            { status: 500 }
        );
    }
}