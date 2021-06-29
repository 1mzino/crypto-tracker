//FETCH TRENDING COINS LIST
const getGlobal = async () => {
  try {
    const global = await (
      await fetch("https://api.coingecko.com/api/v3/global")
    ).json();
    const data = global.data;
    return {
      active_cryptos: data.active_cryptocurrencies,
      total_marketcap: data.total_market_cap.gbp,
      total_volume: data.total_volume.gbp,
      dominance: data.market_cap_percentage,
    };
  } catch (err) {
    console.log(err);
  }
};

const getTrending = async () => {
  try {
    const trending = await (
      await fetch(`https://api.coingecko.com/api/v3/search/trending`)
    ).json();

    return trending.coins;
  } catch (err) {
    console.log(err);
  }
};

//FETCH TOP 10 COINS LIST
const getTopCoins = async () => {
  try {
    const coins = await (
      await fetch(`https://api.coingecko.com/api/v3/global`)
    ).json();
    const coinList = Object.keys(coins.data.market_cap_percentage);
  } catch (err) {
    console.log(err);
  }
};

// const getIds = () => {
//   try {
//     const ids = await(await fetch(``));
//   } catch (err) {
//     console.log(err);
//   }
// };
// COIN LIST
// FILTER COIN INDEX
//FETCH COIN DETAIL
const getCoinData = async (coin) => {
  try {
    const newCoin = await (
      await fetch(
        `https://api.coingecko.com/api/v3/coins/${coin.item.id}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=true&sparkline=false`
      )
    ).json();
    return {
      id: newCoin.id,
      name: newCoin.name,
      symbol: newCoin.symbol,
      image: newCoin.image.large,
      currentPrice: newCoin.market_data.current_price.gbp,
      price24h: newCoin.market_data.price_change_percentage_24h,
      price7d: newCoin.market_data.price_change_percentage_7d,
    };
  } catch (err) {
    console.log(err);
  }
};

export default {
  getGlobal,
  getTrending,
  getCoinData,
  getTopCoins,
};
