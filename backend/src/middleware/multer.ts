import { upload } from "./../controllers/issuse.controller";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/Images")); // Adjust the path as needed
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() + path.extname(file.originalname) // Save the file in the "Images" directory
    );
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  console.log(__dirname);
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Image upload is not of type jpg/jpeg/png"), false);
  }
};

export default multer({ storage: storage, fileFilter: fileFilter });
