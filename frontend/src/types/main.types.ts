export type CryptoCoin = {
  name: string;
  symbol: string;
  price: string;
  percent_change_24h: string;
  volume_24h: string;
  recorded_at: string;
};

export type CryptoCoinHistory = {
  id: number;
  cryptocurrency_id: number;
  price: number;
  volume_24h: number;
  percent_change_24h: number;
  recorded_at: string;
  name: string;
  symbol: string;
};
