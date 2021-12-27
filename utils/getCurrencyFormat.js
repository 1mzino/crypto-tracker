export const getCurrencyFormat = (currency, value) => {
  if (currency.type === "FIAT") {
    return `${currency.symbol}${value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    })}`;
  }

  return `${value} ${currency.symbol}`;
};
