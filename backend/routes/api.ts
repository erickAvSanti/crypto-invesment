import express from "express";
import { getLatestCryptoCurrencyData } from "../services/currency.service";
import {
  fetchAndSaveCryptoData,
  getCurrentPrices,
  getHistoryByDate,
} from "../controllers/prices.controller";
const router = express.Router();
router.get("/list-crypto-currency", async (req, res) => {
  try {
    const data = await getLatestCryptoCurrencyData(10);
    res.send(data);
  } catch (error) {
    res.status(500).send("Error fetching crypto currency data");
  }
});
router.get("/update", fetchAndSaveCryptoData);
router.get("/crypto-coins", getCurrentPrices);
router.get('/history', getHistoryByDate);

export default router;
