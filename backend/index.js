// packages
import dotenv from "dotenv";
import path from "path";
import express from "express";

import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";


// Utiles
import connectDB from "./config/db.js";

dotenv.config({path:"./backend/.env"});
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
// app.use(cors({
//     origin:"*"
// }));
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.options("*", cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/invoices", invoiceRoutes);

app.get("/",(req,res)=>{
    res.send("Api is running")
})

app.listen(port, () => console.log(`Server running on port: ${port}`));