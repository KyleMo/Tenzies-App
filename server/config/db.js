import mongoose from 'mongoose';

const connectDB = async () => {
  console.log("Trying to connect to DB")
  try {
    const connection = await mongoose.connect('mongodb+srv://kylemo:aQ44Ap6Hp0bXzD98@kyle-cluster.5se3r.mongodb.net/tenziesdb?retryWrites=true&w=majority');
    console.log("Connection successful")
  } catch (e) {
    console.error(`Failed Connection: Error: ${e.message}`);
    process.exit();
  }
}

export default connectDB;
