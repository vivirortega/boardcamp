import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import categoriesRouter from "./routes/categoriesRouter.js";


const app = express();
app.use(cors());
app.use(categoriesRouter);
dotenv.config();
app.use(express.json());

app.listen(process.env.PORT, () => console.log(`Server working on port ${process.env.PORT}`));