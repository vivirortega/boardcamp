import { Router } from "express";
import {
  postCustomers,
  getCustomers,
  getCustomerById,
  updateCustomer,
} from "../controllers/customersController.js";

const customersRouter = Router();

customersRouter.post("/customers", postCustomers);
customersRouter.put("/customers/:id", updateCustomer);
customersRouter.get("/customers/:id", getCustomerById);
customersRouter.get("/customers", getCustomers);

export default customersRouter;
