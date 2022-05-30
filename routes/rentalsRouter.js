import { Router } from "express";
import {
  getRentals,
  postRentals,
  deleteRentals,
  returnRentals,
} from "../controllers/rentalsController.js";
import { rentalsValidate, validateDeleteRental } from "../middlewares/rentalsMiddleware.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post("/rentals", rentalsValidate, postRentals);
rentalsRouter.post("/rentals/:id/return", returnRentals);
rentalsRouter.delete("/rentals/:id", validateDeleteRental, deleteRentals);

export default rentalsRouter;
