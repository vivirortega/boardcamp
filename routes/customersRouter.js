import { Router } from "express";
import {
  postCustomers,
  getCustomers,
  getCustomerById,
  updateCustomer,
} from "../controllers/customersController.js";
import { customersValidate } from "../middlewares/customersMiddleware.js";

const customersRouter = Router();

customersRouter.post("/customers", customersValidate, postCustomers);
customersRouter.put("/customers/:id", customersValidate, updateCustomer);
customersRouter.get("/customers/:id", getCustomerById);
customersRouter.get("/customers", getCustomers);

export default customersRouter;
