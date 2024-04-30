import dotenv from 'dotenv';
dotenv.config();

import path from 'path';
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

app.use("/api/eventlogs/", eventRouter);

app.use(express.static(path.join('public', 'browser')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname,'public', 'browser', 'index.html'));
    })

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("website served on http://localhost:" + port);
})