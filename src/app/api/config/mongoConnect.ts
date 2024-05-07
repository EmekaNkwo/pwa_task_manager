import mongoose from "mongoose";

const mongoDBUrl = process.env.NEXT_PUBLIC_MONGO_URL as string;

const connectMongoDB = async () => {
    try {
        await mongoose.connect(mongoDBUrl);
    } catch (error) {
        const errorMesg = error as any;
        console.error("Error connecting to MongoDB:", errorMesg.message);
    }
};

export default connectMongoDB;
