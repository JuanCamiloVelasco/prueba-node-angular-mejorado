import dotenv from 'dotenv';
dotenv.config();

import path from 'path';
import express from "express";
import cors from "cors";
import dbConnect from './configs/database.config'
import eventRouter from "./routers/event.log.router";
dbConnect();

import RabbitMQClient from './rabbitmq/client';


const app = express();
app.use(express.json());
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

// rutas a las apis
app.use("/api/eventlogs/", eventRouter);


// Especifico las rutas al crear la carpeta public para el despliegue
app.use(express.static(path.join('public', 'browser')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname,'public', 'browser', 'index.html'));
    })


// especifico el puerto para el despliege 
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("website served on http://localhost:" + port);
    RabbitMQClient.initialize();
})