import "dotenv/config";

import "express-async-errors";

import express from "express";
const app = express();

import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// database
import connectDB from "./db/connect.js";

// product router
import productRouter from "./routes/productRoutes.js";

// error handler
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

app.use(express.static("./public"));
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

app.use("/api/v1/products", productRouter);
// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
