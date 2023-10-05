import express, { Request, Response } from "express";
import cors from 'cors'
const app = express()

app.use(express.json())
app.use(cors())



app.listen(3333,()=>console.log("Server running at port: 3333."))