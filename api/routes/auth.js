import express from "express";
import {
  Login,
  Logout,
  Register,
  getAllusers,
  getfeedback,
  getoneuser,
  giveFeedback,
  setprofile,
} from "../controllers/auth.js";
const router = express.Router();
router.post("/register", Register);
router.post("/login", Login);
router.post("/logout", Logout);
router.get("/getusers", getAllusers);
router.post("/givefeedback", giveFeedback);
router.get("/getfeedbacks", getfeedback);
router.post("/setprofile", setprofile);
router.get("/getoneuser", getoneuser);
export default router;
