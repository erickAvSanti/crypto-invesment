const API_BASE_URL = "http://localhost:4000/api";

export const getCryptoCoinsData = async () => {
  const res = await fetch(`${API_BASE_URL}/crypto-coins`);
  return await res.json();
};

export const getHistory = async (
  cryptoId: string,
  from: string,
  to: string
) => {
  const res = await fetch(
    `http://localhost:4000/api/history?cryptoId=${cryptoId}&from=${from}&to=${to}`
  );
  return await res.json();
};
