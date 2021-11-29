const getMarketData = async () => {
  try {
    const res = await (await fetch("https://api.coingecko.com/api/v3/global"))
      .json()
      .then((res) => res.data);

    return {
      volume: res.total_volume,
      market_cap: res.total_market_cap,
      market_cap_change: res.market_cap_change_percentage_24h_usd,
      active_cryptos: res.active_cryptocurrencies,
      dominance: res.market_cap_percentage,
    };
  } catch (err) {
    console.log(err);
  }
};

const getTrendingCoins = async () => {
  try {
    const res = await (
      await fetch(`https://api.coingecko.com/api/v3/search/trending`)
    ).json();
    return res.coins.map((coin) => coin.item);
  } catch (err) {
    console.log(err);
  }
};

const getTableData = async () => {
  try {
    const res = await (
      await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp&order=market_cap_desc&per_page=10&page=1&sparkline=true&price_change_percentage=24h%2C7d%2C`
      )
    ).json();

    const coins = await Promise.all(
      res.map(
        async (coin) =>
          await (
            await fetch(
              `https://api.coingecko.com/api/v3/coins/${coin.id}?localization=true&tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true`
            )
          ).json()
      )
    );
    return coins.map((coin) => {
      return {
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        image: coin.image.large,
        market_cap_rank: coin.market_cap_rank,
        circulating_supply: coin.market_data.circulating_supply,
        market_cap: coin.market_data.market_cap,
        total_volume: coin.market_data.total_volume,
        current_price: coin.market_data.current_price,
        change24h: coin.market_data.price_change_percentage_24h_in_currency,
        change7d: coin.market_data.price_change_percentage_7d_in_currency,
        sparklines: coin.market_data.sparkline_7d.price,
      };
    });
  } catch (err) {
    console.log(err);
  }
};

export default {
  getMarketData,
  getTrendingCoins,
  getTableData,
};
