import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer";
import authRoutes from "./routes/auth.js";
import citiesRoutes from "./routes/Cities.js";
import cityRoutes from "./routes/City.js";
import postRoutes from "./routes/Posts.js";
const app = express();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });
//this function is to reply to the client about the status of the file and let the client end have access to the file name.
app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  // You can access file properties like filename, size, mimetype, etc.
  const { filename, size, mimetype } = file;
  res.status(200).json({
    filename,
    size,
    mimetype,
    message: "File uploaded successfully",
  });
});
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/cities", citiesRoutes);
app.use("/api/city", cityRoutes);
app.use("/api/posts", postRoutes);
app.listen(8800, () => {
  console.log("port connected!");
});
