import { Router } from "express";
import {
  getRentals,
  postRentals,
  deleteRentals,
} from "../controllers/rentalsController.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post("/rentals", postRentals);
rentalsRouter.delete("/rentals/:id", deleteRentals);

export default rentalsRouter;
