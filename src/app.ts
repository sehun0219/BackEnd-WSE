import express from "express";
import { connectDB } from "./config/db";
import "./models/user";
import "./models/review";
import "./models/recipe";
import router from "./routers";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8080;
connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log("✅ Server listening on port: 8080");
});
