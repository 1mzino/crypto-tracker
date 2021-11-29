import useSWR from "swr";

const useGlobalData = () => {
  const { data, error } = useSWR(
    "https://api.coingecko.com/api/v3/global",
    async (url) => {
      const res = await (await fetch(url)).json().then((res) => res.data);
      return {
        volume: res.total_volume,
        market_cap: res.total_market_cap,
        market_cap_change: res.market_cap_change_percentage_24h_usd,
        active_cryptos: res.active_cryptocurrencies,
        dominance: res.market_cap_percentage,
      };
    }
  );

  return {
    marketData: data,
    isLoading: !data && !error,
    isError: error,
  };
};

export default useGlobalData;
