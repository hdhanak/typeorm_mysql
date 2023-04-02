import express from "express";
import "reflect-metadata"; 
require('reflect-metadata')
import AppDataSource from "./config/db";
import { router } from "./router/routers";

const app =express()
const port = 8000
app.use(express.json())

// app.use(express.urlencoded)
app.use('/',router)

AppDataSource
app.use(express)
app.listen(port,():void=>{
    console.log('serevr listning');
    
})