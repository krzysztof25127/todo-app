import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB połączono pomyślnie");
  } catch (error) {
    console.error("Błąd połączenia z MongoDB:", error);
  }
};
