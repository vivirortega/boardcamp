import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import categoriesRouter from "./routes/categoriesRouter.js";


const app = express();
app.use(express.json());
app.use(cors());
app.use(categoriesRouter);
dotenv.config();


app.listen(process.env.PORT, () => console.log(`Server working on port ${process.env.PORT}`));