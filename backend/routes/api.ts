import express from "express";
import { getLatestCryptoCurrencyData } from "../services/currency.service";
const router = express.Router();
router.get("/list-crypto-currency", async (req, res) => {
  try {
    const data = await getLatestCryptoCurrencyData(10);
    res.send(data);
  } catch (error) {
    res.status(500).send("Error fetching crypto currency data");
  }
});

export default router;
