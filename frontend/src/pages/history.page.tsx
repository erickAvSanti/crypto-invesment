import { useEffect, useState } from "react";
import { getCryptoCoinsData, getHistory } from "../services/api";
import type { CryptoCoinHistory } from "../types/main.types";
import { CryptoCoinsPricesChart } from "../components/crypto.coins.prices.chart";
import { CryptoCoinsTable } from "../components/crypto.coins.table";

export const HistoryPage = () => {
  const [cryptoList, setCryptoList] = useState<CryptoCoinHistory[]>([]);
  const [selectedCryptoCoinId, setSelectedCryptoCoinId] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    getCryptoCoinsData().then(setCryptoList);
  }, []);

  const handleSearch = async () => {
    if (!selectedCryptoCoinId || !fromDate || !toDate) return;
    const res = await getHistory(selectedCryptoCoinId, fromDate, toDate);
    setHistory(res);
  };

  return (
    <div>
      <h2>Historial de Precios</h2>
      <div>
        <select onChange={(e) => setSelectedCryptoCoinId(e.target.value)}>
          <option value="">Seleccione moneda</option>
          {cryptoList.map((coin) => (
            <option key={coin.symbol} value={coin.cryptocurrency_id || coin.id}>
              {coin.name} ({coin.symbol})
            </option>
          ))}
        </select>
        <input type="date" onChange={(e) => setFromDate(e.target.value)} />
        <input type="date" onChange={(e) => setToDate(e.target.value)} />
        <button
          onClick={handleSearch}
          disabled={!selectedCryptoCoinId || !fromDate || !toDate}
        >
          Buscar
        </button>
      </div>

      {history.length > 0 && (
        <>
          <CryptoCoinsPricesChart data={history} />
          <CryptoCoinsTable data={history} />
        </>
      )}
    </div>
  );
};
