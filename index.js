import express from "express";
import dotenv from "dotenv";
import bookingsRoutes from "./routes/bookings.js";
import ratesAndAvailabilityRoutes from "./routes/ratesAndAvailibility.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use("/", bookingsRoutes);
app.use("/rates&Availibility", ratesAndAvailabilityRoutes);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});