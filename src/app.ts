import express, { Request, Response, NextFunction } from "express";
import { connectDB } from "./config/db";
import "./models/user";
import "./models/review";
import "./models/recipe";
import router from "./routers";
import cors from "cors";


const app = express();


connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);


app.listen("8080", () => {
  console.log("✅ Server listening on port: 8080");
});
