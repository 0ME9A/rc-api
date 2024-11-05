import { NextResponse } from "next/server";
import clientPromise from "@/server/connect";

export async function GET() {
  try {
    // Test MongoDB connection
    const client = await clientPromise;
    const db = client.db();
    await db.command({ ping: 1 });

    // Success response
    return NextResponse.json({
      message: "API is successfully connected to MongoDB!",
    });
  } catch (error) {
    // Handle the unknown error by checking its type
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    console.error("Error connecting to MongoDB:", errorMessage);
    return NextResponse.json(
      { message: "Failed to connect to MongoDB", error: errorMessage },
      { status: 500 }
    );
  }
}