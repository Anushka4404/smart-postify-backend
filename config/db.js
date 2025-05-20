import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config(); // Load .env variables

// //const DB_URI = process.env.DB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI
      , {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
    console.log("✅ Database is connected...");
  } catch (error) {
    console.error("❌ Error connecting to DB:", error.message);
    process.exit(1); // Stop the app if DB connection fails
  }
};

export default connectDB;
