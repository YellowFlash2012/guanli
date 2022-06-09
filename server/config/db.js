import mongoose from "mongoose";

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.db}`.cyan.underline.bold);
}

export default connectDB