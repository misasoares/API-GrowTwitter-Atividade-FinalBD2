import express, { Request, Response } from "express";
import cors from 'cors'
import { userRoutes } from "./routes/user.routes";
import { tweetRoutes } from "./routes/tweet.routes";
const app = express()

app.use(express.json())
app.use(cors())

app.use("/users", userRoutes());
app.use("/tweets", tweetRoutes());

app.listen(3333,()=>console.log("Server running at port: 3333."))