import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from "cors";
import dbConnect from './configs/database.config'
import eventRouter from "./routers/event.log.router";
dbConnect();

const app = express();
app.use(express.json());
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

app.use("/api/eventlogs/", eventRouter)

const port = 5000;
app.listen(port, () => {
    console.log("website served on http://localhost:" + port);
})