import clientPromise from "@/server/connect";
import { NextResponse } from "next/server";

// Fetch testimonials with a limit
export async function GET(request: Request) {
    const db_name = process.env.DB_NAME;

    // Parse the URL and extract the limit from the query parameters
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "0", 10); // Default to 0 if no limit is provided

    try {
        // Connect to the MongoDB client
        const client = await clientPromise;
        const db = client.db(db_name);

        // Fetch testimonials collection with the limit
        const testimonials = await db
            .collection("testimonials")
            .find({})
            .limit(limit > 0 ? limit : 0) // Only apply limit if it's greater than 0
            .toArray();

        // Send the response
        return NextResponse.json({ success: true, total: testimonials.length, data: testimonials });
    } catch (error) {
        console.log(error)

        return NextResponse.json({
            success: false,
            message: "Failed to fetch testimonials",
        });
    }
}