import express from "express";
import {
  setPost,
  getPost,
  getAllPosts,
  addtolikespostsandusers,
  removefromslikedpostsandusers,
  addlikestoposts,
  addsavestoposts,
  addtolikedcities,
  addtosavedcities,
  addlikestocities,
  addsavestocities,
  deletefromlikedcities,
  deletefromsavedcities,
  getlikedsavedcitydata,
  deletelikesfromposts,
  checkliked,
} from "../controllers/Post.js";
const router = express.Router();
router.post("/", setPost);
router.get("/", getPost);
router.get("/blogs", getAllPosts);
router.post("/likespostsandusers", addtolikespostsandusers);
router.post("/removelikefrompostsanduser", removefromslikedpostsandusers);
router.get("/getfromcitiesanduser", getlikedsavedcitydata);
router.post("/likestocitiesanduser", addtolikedcities);
router.post("/deletelikesfromcitiesanduser", deletefromlikedcities);
router.post("/deletesavesfromcitiesanduser", deletefromsavedcities);
router.post("/savestocitiesanduser", addtosavedcities);
router.post("/addlikestocities", addlikestocities);
router.post("/removelikefrompost", deletelikesfromposts);
router.post("/addsavestocities", addsavestocities);
router.post("/addlikestoposts", addlikestoposts);
router.post("/addsavestoposts", addsavestoposts);
router.get("/getlikedposts",checkliked)
export default router;
