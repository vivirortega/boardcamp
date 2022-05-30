import { Router } from "express";
import { postCustomers } from "../controllers/customersController.js";

const customersRouter = Router();

customersRouter.post("/customers", postCustomers);

export default customersRouter;
