import mongoose from "mongoose";

const connectDb = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`Mongodb connected with server: ${data.connection.host}`);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export default connectDb;
