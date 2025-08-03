const API_BASE_URL = "http://localhost:4000/api";

export const getCryptoCoinsData = async () => {
  const res = await fetch(`${API_BASE_URL}/crypto-coins`);
  return await res.json();
};
