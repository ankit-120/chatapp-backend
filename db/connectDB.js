import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(
      `${process.env.DB_CONNECTION_STRING}`
    );
    console.log(
      "Database connected : ",
      connect.connection.host,
      connect.connection.name
    );
  } catch (error) {
    console.log("Database connection error : ", error);
    process.exit(1);
  }
};

export { connectDB };
