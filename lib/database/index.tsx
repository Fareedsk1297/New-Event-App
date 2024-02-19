import mongoose, { Connection } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

interface Cached {
  conn: Connection | null;
  promise: Promise<typeof mongoose> | null;
}

let cached: Cached = {
  conn: null,
  promise: null,
};

export const connectToDatabase = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is missing");
  }

  try {
    cached.promise =
      cached.promise ||
      mongoose.connect(MONGODB_URI, {
        // dbName: "EventApp",
        bufferCommands: false,
      });

    const mongooseInstance = await cached.promise;
    cached.conn = mongooseInstance.connection;

    return cached.conn;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Unable to connect to MongoDB");
  }
};
