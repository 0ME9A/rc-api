import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/server/connect";

// GET method to retrieve a single project by ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = params.id;

    // Ensure the provided ID is a valid MongoDB ObjectId
    if (!ObjectId.isValid(projectId)) {
      return NextResponse.json(
        { error: "Invalid project ID format" },
        { status: 400 }
      );
    }

    // Connect to the MongoDB client
    const client = await clientPromise;
    const db = client.db(); // Default database
    const projectCollection = db.collection("projects"); // Replace with your collection name

    // Fetch the project by ID
    const project = await projectCollection.findOne({
      _id: new ObjectId(projectId),
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}