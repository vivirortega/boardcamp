import { Router } from "express";
import { postCustomers, getCustomers } from "../controllers/customersController.js";

const customersRouter = Router();

customersRouter.post("/customers", postCustomers);
customersRouter.get("/customers", getCustomers);

export default customersRouter;
