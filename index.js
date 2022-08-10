import express from "express";
import dotenv from "dotenv";
import bookingsRoutes from './routes/bookings.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use('/',bookingsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
