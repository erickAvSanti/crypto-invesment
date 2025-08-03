type CryptoCoin = {
  name: string;
  symbol: string;
  price: string;
  percent_change_24h: string;
  volume_24h: string;
  recorded_at: string;
};

export const CryptoCoins = ({ data }: { data: CryptoCoin[] }) => (
  <div className="overflow-x-auto rounded-lg shadow-md">
    <table className="min-w-full text-sm text-left text-gray-800 dark:text-gray-200">
      <thead className="bg-gray-200 dark:bg-gray-700 text-xs uppercase text-gray-600 dark:text-gray-300">
        <tr>
          <th className="px-4 py-3">Name</th>
          <th className="px-4 py-3">Symbol</th>
          <th className="px-4 py-3">Price</th>
          <th className="px-4 py-3">24h Change (%)</th>
          <th className="px-4 py-3">Volume (24h)</th>
          <th className="px-4 py-3">Last Update</th>
        </tr>
      </thead>
      <tbody>
        {data.map((coin, index) => (
          <tr
            key={index}
            className={`border-b dark:border-gray-700 ${
              index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-900"
            }`}
          >
            <td className="px-4 py-2">{coin.name}</td>
            <td className="px-4 py-2 uppercase font-semibold">{coin.symbol}</td>
            <td className="px-4 py-2 text-green-600 dark:text-green-400">
              ${parseFloat(coin.price).toFixed(2)}
            </td>
            <td
              className={`px-4 py-2 font-medium ${
                parseFloat(coin.percent_change_24h) >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {parseFloat(coin.percent_change_24h).toFixed(2)}%
            </td>
            <td className="px-4 py-2">
              ${parseFloat(coin.volume_24h).toLocaleString()}
            </td>
            <td className="px-4 py-2 text-xs">
              {new Date(coin.recorded_at).toLocaleTimeString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);