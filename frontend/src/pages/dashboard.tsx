import { useEffect, useState } from "react";
import { getCryptoPrices } from "../services/api";
import { CryptoCoins } from "../components/crypto.coins";

const Dashboard = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await getCryptoPrices();
      setData(response);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000); // actualiza cada 30 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Crypto Dashboard</h1>
      <CryptoCoins data={data} />
    </div>
  );
};

export default Dashboard;
