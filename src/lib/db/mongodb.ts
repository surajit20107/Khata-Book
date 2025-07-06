import mongoose, {Connection} from "mongoose";

const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  throw new Error("Please define MONGODB_URI in environment variables");
}

let cachedConnection: Connection | null = null;

export const connectToDatabase = async () => {
  if (cachedConnection) {
    return cachedConnection;
  }
  try {
    const connect = await mongoose.connect(mongoURI);
      cachedConnection = connect.connection;
    return cachedConnection;
  } catch (error) {
    console.log(error);
  }
};
