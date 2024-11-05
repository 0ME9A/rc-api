import { NextResponse } from "next/server";
import clientPromise from "@/server/connect";

// GET method to retrieve a single testimonial by email
export async function GET(
  req: Request,
  { params }: { params: { emailId: string } }
) {
  try {
    const emailId = params.emailId;

    console.log("Fetching testimonial for email:", emailId);

    // Connect to the MongoDB client
    const client = await clientPromise;
    const db = client.db(); // Default database
    const testimonialCollection = db.collection("testimonials"); // Replace with your collection name

    // Fetch the testimonial by email
    const testimonial = await testimonialCollection.findOne({
      email: emailId, // Use the emailId directly for email-based query
    });

    // If no testimonial is found, return a 404 response
    if (!testimonial) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }

    // Return the found testimonial as a JSON response
    return NextResponse.json(testimonial, { status: 200 });
  } catch (error) {
    console.error("Error fetching testimonial:", error);
    // Return a 500 response if there is a server error
    return NextResponse.json(
      { error: "Failed to fetch testimonial" },
      { status: 500 }
    );
  }
}
