import { Router } from "express";
import { postCustomers, getCustomers, getCustomerById} from "../controllers/customersController.js";

const customersRouter = Router();

customersRouter.post("/customers", postCustomers);
customersRouter.get("/customers/:id", getCustomerById);
customersRouter.get("/customers", getCustomers);


export default customersRouter;
