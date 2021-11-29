export const tableDataReducer = (state, action) => {
  return action.payload.map((coin) => ({
    id: coin.id,
    name: coin.name,
    symbol: coin.symbol,
    image: coin.image,
    market_cap_rank: coin.market_cap_rank,
    circulating_supply: coin.circulating_supply,
    market_cap: coin.market_cap[action.type],
    total_volume: coin.total_volume[action.type],
    current_price: coin.current_price[action.type],
    change24h: coin.change24h[action.type],
    change7d: coin.change7d[action.type],
    sparklines: coin.sparklines,
  }));
};
