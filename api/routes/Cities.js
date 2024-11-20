import express from "express";
import {
  getAllCategory,
  getAllCities,
  getCity,
  getFavcities,
} from "../controllers/Cities.js";
import { getAllPackages } from "../controllers/City.js";
import { getCategory } from "../controllers/Cities.js";
import { getSingleCatPlace } from "../controllers/Cities.js";
const router = express.Router();
router.get("/", getAllCities);
router.get("/packages", getAllPackages);
router.get("/package/:id", getCategory);
router.get("/packagecat/:id", getSingleCatPlace);
router.get("/allcity", getCity);
router.get("/getfavcity", getFavcities);
router.get("/getallcategory", getAllCategory);
export default router;
