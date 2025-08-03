import { Request, Response } from "express";
import db from "../models/db";
import { getLatestCryptoCurrencyData } from "../services/currency.service";

type CryptoCurrency = {
  name: string;
  symbol: string;
  slug: string;
  quote: any;
  id: number;
};

function storeCryptoCurrenciesData(data: CryptoCurrency[]) {
  const now = new Date();
  data.forEach((crypto: CryptoCurrency) => {
    const { name, symbol, slug, quote, id } = crypto;
    const { price, volume_24h, percent_change_24h } = quote.USD;

    db.query(
      `INSERT IGNORE INTO cryptocurrencies (id, name, symbol, slug) VALUES (?, ?, ?, ?)`,
      [id, name, symbol, slug]
    );

    db.query(
      `INSERT INTO prices (cryptocurrency_id, price, volume_24h, percent_change_24h, recorded_at)
         VALUES (?, ?, ?, ?, ?)`,
      [id, price, volume_24h, percent_change_24h, now]
    );
  });
}

export async function fetchAndSaveCryptoData(req: Request, res: Response) {
  try {
    const data: CryptoCurrency[] = await getLatestCryptoCurrencyData();
    storeCryptoCurrenciesData(data);
    res.json({ message: "Data updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching crypto data");
  }
}

export async function getCurrentPrices(req: Request, res: Response) {
  db.query(
    `
    SELECT c.id, c.name, c.symbol, p.cryptocurrency_id, p.price, p.volume_24h, p.percent_change_24h, p.recorded_at
    FROM prices p
    JOIN cryptocurrencies c ON c.id = p.cryptocurrency_id
    WHERE p.recorded_at = (
      SELECT MAX(recorded_at) FROM prices WHERE cryptocurrency_id = c.id
    )`,
    (err, results) => {
      if (err) return res.status(500).send("DB Error");
      res.json(results);
    }
  );
}

export function getHistoryByDate(req: Request, res: Response) {
  const { cryptoId, from, to } = req.query;

  db.query(
    `SELECT p.*, c.name, c.symbol
     FROM prices p
     JOIN cryptocurrencies c ON c.id = p.cryptocurrency_id
     WHERE p.cryptocurrency_id = ?
     AND DATE(p.recorded_at) BETWEEN ? AND ?
     ORDER BY p.recorded_at ASC`,
    [cryptoId, from, to],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Database error");
      }
      res.json(results);
    }
  );
}
