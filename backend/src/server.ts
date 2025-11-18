import dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import prisma from "./config/prismaClient";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/api/bookings", async (_req: Request, res: Response) => {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { date: "asc" }
    });
    res.json({ bookings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
});

app.post("/api/bookings", async (req: Request, res: Response) => {
  const { date, name } = req.body;
  if (!date || !name)
    return res.status(400).json({ error: "Missing date or name" });

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date))
    return res.status(400).json({ error: "Invalid date format (YYYY-MM-DD)" });

  try {
    const booking = await prisma.booking.create({
      data: { date, name },
    });
    return res.status(201).json(booking);
  } catch (err: any) {
    if (err.code === "P2002")
      return res.status(409).json({ error: "Date already booked" });
    console.error(err);
    return res.status(500).json({ error: "DB insert error" });
  }
});

app.listen(port, () => {
  console.log(`🚗 Backend running at http://localhost:${port}`);
});
