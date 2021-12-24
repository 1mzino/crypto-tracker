export const getCurrencyFormat = (currency, value) => {
  if (currency.type === "FIAT") {
    return `${currency.symbol}${value}`;
  }

  return `${value} ${currency.symbol}`;
};
