import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/server/connect";

// GET method to retrieve a single testimonial by ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const testimonialId = params.id;

    // Ensure the provided ID is a valid MongoDB ObjectId
    if (!ObjectId.isValid(testimonialId)) {
      return NextResponse.json(
        { error: "Invalid testimonial ID format" },
        { status: 400 }
      );
    }

    // Connect to the MongoDB client
    const client = await clientPromise;
    const db = client.db(); // Default database
    const testimonialCollection = db.collection("testimonials"); // Replace with your collection name

    // Fetch the testimonial by ID
    const testimonial = await testimonialCollection.findOne({
      _id: new ObjectId(testimonialId),
    });

    if (!testimonial) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }

    return NextResponse.json(testimonial, { status: 200 });
  } catch (error) {
    console.error("Error fetching testimonial:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonial" },
      { status: 500 }
    );
  }
}