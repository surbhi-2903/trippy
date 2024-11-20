import express from "express";
import { getCityandPlaces } from "../controllers/City.js";
import { getSinglePlace } from "../controllers/City.js";
const router = express.Router();
router.get("/:id", getCityandPlaces);
router.get("/singlecity/:id", getSinglePlace);
export default router;
