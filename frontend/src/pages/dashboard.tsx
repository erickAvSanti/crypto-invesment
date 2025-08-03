import { useEffect, useState } from "react";
import { getCryptoCoinsData } from "../services/api";
import { CryptoCoins } from "../components/crypto.coins";
import { CryptoCoinsPricesChart } from "../components/crypto.coins.prices.chart";

const Dashboard = () => {
  const [cryptoCoinsData, setCryptoCoinsData] = useState([]);

  const fetchCryptoCoinsData = async () => {
    try {
      const response = await getCryptoCoinsData();
      setCryptoCoinsData(response);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCryptoCoinsData();
    const interval = setInterval(fetchCryptoCoinsData, 30000); // actualiza cada 30 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Crypto Dashboard</h1>
      <CryptoCoins data={cryptoCoinsData} />
      <CryptoCoinsPricesChart data={cryptoCoinsData} />
    </div>
  );
};

export default Dashboard;
