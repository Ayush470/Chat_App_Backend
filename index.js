import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import OpenAI from "openai";
import openAiRoutes from "./routes/openai.js";
import authRoutes from "./routes/auth.js";
import { AbortController } from 'abort-controller';
// global.AbortController = AbortController;

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

/* OPEN AI CONFIGURATION */
const configuration = new OpenAI({
  apiKey: process.env.OPEN_API_KEY // This is also the default, can be omitted
});
export const openai = new OpenAI(configuration);


/* ROUTES */
app.use("/openai", openAiRoutes);
app.use("/auth", authRoutes);

/* SERVER SETUP */
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
