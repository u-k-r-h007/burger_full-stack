import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import { connectPassport } from "./utils/Provider.js";
import passport from "passport";
import { errorMiddelware } from "./middlewares/errorMiddleware.js";
import cors from "cors";

const app = express();

dotenv.config({
  path: "./config/config.env",
});

// middlewares should be after config and before routes
app.use(
  session({
    secret: "sakjbhaskjbsafcjkdafckjc",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "development" ? false : true,
      httpOnly: process.env.NODE_ENV === "development" ? false : true,
      sameSite:  process.env.NODE_ENV === "development" ?false :"none",
    },
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(
  urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
    mrthods: ["GET", "POST", "PUT", "DELETE"],
  })
);
// make sure that these things should be used after the session is created
app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());
// make sure that these things should be used after the session is created

// make sure to enable this because there will be no cookie
app.enable("trust proxy")
connectPassport();

// importing routes

import userRoute from "./routes/user.js";
import orderRoute from "./routes/order.js";

app.use("/api/v1", userRoute);
app.use("/api/v1", orderRoute);

//using error middleware

app.use(errorMiddelware);

export default app;
