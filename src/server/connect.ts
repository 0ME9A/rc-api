import { MongoClient } from "mongodb";

const DB_URI = process.env.MONGODB_URI
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!DB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

// Fix for TypeScript to recognize global properties
declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable to persist the connection
  if (!global._mongoClientPromise) {
    client = new MongoClient(DB_URI, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, create a new MongoClient and connect
  client = new MongoClient(DB_URI, options);
  clientPromise = client.connect();
}

export default clientPromise;