import express from "express";
import dotenv from "dotenv";
import bookingsRoutes from "./routes/bookings.js";
import cors from "cors";
import ratesAndAvailabilityRoutes from "./routes/ratesAndAvailibility.js";

dotenv.config();
//comment

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/", bookingsRoutes);
app.use("/", ratesAndAvailabilityRoutes);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
