const API_BASE_URL = "http://localhost:4000/api";

export const getCryptoPrices = async () => {
  const res = await fetch(`${API_BASE_URL}/crypto-prices`);
  return await res.json();
};
