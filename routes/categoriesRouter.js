import { Router } from "express";
import { getCategories, postCategories } from "../controllers/categoriesController.js";
import { categorieValidator } from "../middlewares/categoriesMiddleware.js";

const categoriesRouter = Router();

categoriesRouter.get("/categories", getCategories);
categoriesRouter.post("/categories", categorieValidator, postCategories);

export default categoriesRouter;