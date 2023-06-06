import app from "./app.js";
import { connectDB } from "./config/database.js";
import Razorpay from "razorpay";

connectDB();

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

app.get("/", (req, res, next) => {
  res.send("<h1>hi from server</h1>");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server running on ${PORT}, IN ${process.env.NODE_ENV} MODE`);
});
