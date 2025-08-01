import express from "express";
import { getLatestCryptoCurrencyData } from "../services/currency.service";
const router = express.Router();
router.get("/list-crypto-currency", getLatestCryptoCurrencyData);

export default router;
