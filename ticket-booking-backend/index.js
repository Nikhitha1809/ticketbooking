import express from 'express';
import cors from 'cors';
import https from "node:https";
import http from "node:http";
import { Router } from 'express';
import mongoose from 'mongoose';
import signInController from './Controllers/signInController.js';
import signUpController from './Controllers/signUpController.js';

const app = express();
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(express.json());
app.use(
    cors({
        origin:[
            "http://localhost:5173",
            "https://movie-ticketbooking.vercel.app",
        ],
        methods:[ "GET","POST","PUT","PATCH","DELETE"],
        allowedHeaders:[
            "Content-Type",
            "Authorization",
            "X-session-token",
        ],
        preflightContinue:false,
    })
);

app.get("/", async(req,res)=>{
    res.status(200).end("Hello from Ticket Booking")
});


app.post("/api/sign-in",signInController);
app.post("/api/sign-up",signUpController);

app.listen(5000,()=>{
     try{
        console.log("Express server started");
        mongoose.connect("mongodb://127.0.0.1:27017/movies")
        .then(()=>{
            console.log("mongodb connected")
        }).catch((e)=>{
            console.log("error in mongodb",e)
        })
    }catch(error){
        console.log("index.js catch block error");
        process.exist();
    }
})