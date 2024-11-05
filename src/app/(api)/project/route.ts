import { NextResponse } from "next/server";
import clientPromise from "@/server/connect";

// Fetch projects with a limit
export async function GET(request: Request) {
    const db_name = process.env.DB_NAME;

    // Parse the URL and extract the limit from the query parameters
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "0", 10); // Default to 0 if no limit is provided
    const type = searchParams.get("type");

    const projectType = type ? { projectType: type } : {}

    try {
        // Connect to the MongoDB client
        const client = await clientPromise;
        const db = client.db(db_name);

        // Fetch projects collection with the limit
        const projects = await db
            .collection("projects")
            .find(projectType)
            .limit(limit > 0 ? limit : 0) // Only apply limit if it's greater than 0
            .toArray();

        // Send the response
        return NextResponse.json({ success: true, total: projects.length, data: projects });
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "Failed to fetch projects",
        });
    }
}