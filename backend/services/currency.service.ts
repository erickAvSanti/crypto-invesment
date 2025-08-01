import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const headers = {
  "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY,
};

export async function getLatestCryptoCurrencyData(limit = 10) {
  const url = `${process.env.CMC_API_URL}/cryptocurrency/listings/latest?limit=${limit}&convert=USD`;
  console.log(`url: ${url}`);
  const response = await axios.get(url, { headers });
  return response.data.data;
}
