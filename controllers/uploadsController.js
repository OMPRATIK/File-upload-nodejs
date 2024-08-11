import { StatusCodes } from "http-status-codes";
import path from "path";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

import { __dirname } from "../util/files.util.js";
import { BadRequestError } from "../errors/index.js";

const uploadProductImageLocal = async (req, res) => {
  // Check if file exists
  if (!req.files) {
    throw new BadRequestError("No file Uploaded");
  }
  const productImage = req.files.image;

  // Check if file type is Image
  if (!productImage.mimetype.startsWith("image")) {
    throw new BadRequestError("Please Upload Image");
  }

  const maxSize = 1024 * 1024;
  // Check if image is of correct size
  if (productImage.size > maxSize) {
    throw new BadRequestError(
      `Please upload image smaller than ${maxSize} bytes`
    );
  }

  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  );

  await productImage.mv(imagePath);

  res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImage.name}` } });
};

const uploadProductImage = async (req, res) => {
  if (!req.files) {
    throw new BadRequestError("No file Uploaded");
  }

  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "file-upload",
    }
  );

  console.log(result);
  fs.unlinkSync(req.files.image.tempFilePath);
  res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
};

export { uploadProductImage };
