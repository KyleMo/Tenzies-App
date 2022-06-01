import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connection successful")
  } catch (e) {
    console.error(`Failed Connection: Error: ${e.message}`);
    process.exit();
  }
}

export default connectDB;
