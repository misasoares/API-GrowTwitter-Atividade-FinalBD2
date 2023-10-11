import express, { Request, Response } from "express";
import cors from "cors";
import { userRoutes } from "./routes/user.routes";
import { tweetRoutes } from "./routes/tweet.routes";
import { authRoutes } from "./routes/auth.routes";
import { retweetRoutes } from "./routes/retweet.routes";
import { likeRoutes } from "./routes/like.routes";
import { followerRoutes } from "./routes/follower.routes";
const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", userRoutes());
app.use("/tweets", tweetRoutes());
app.use("/retweets", retweetRoutes());
app.use("/auth", authRoutes());
app.use("/like", likeRoutes());
app.use("/follower", followerRoutes());

app.listen(3333, () => console.log("Server running at port: 3333."));
