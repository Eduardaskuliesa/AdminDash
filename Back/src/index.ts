import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
// Route IMPORTS
import dashboardRoutes from "./routes/dashboardRoutes";
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";
import { Request, Response } from "express";

// CONFIGURATIONS
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());



app.use((req: Request, res: Response, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});
//ROUTES
app.use("/dashboard", dashboardRoutes);
app.use(authRoutes);
app.use(productRoutes);

//SERVER

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port} `);
});
