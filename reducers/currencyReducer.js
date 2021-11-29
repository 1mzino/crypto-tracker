export const currencyReducer = (state, action) => {
  switch (action.type) {
    case "USD":
      return {
        ...state,
        shorthand: "USD",
        symbol: "$",
        type: "FIAT",
      };
    case "GBP":
      return {
        ...state,
        shorthand: "GBP",
        symbol: "£",
        type: "FIAT",
      };
    case "EUR":
      return {
        ...state,
        shorthand: "EUR",
        symbol: "€",
        type: "FIAT",
      };
    case "SATS":
      return {
        ...state,
        shorthand: "SATS",
        symbol: "SATS",
        type: "CRYPTO",
      };
    case "BITS":
      return {
        ...state,
        shorthand: "BITS",
        symbol: "BITS",
        type: "CRYPTO",
      };
    case "BTC":
      return {
        ...state,
        shorthand: "BTC",
        symbol: "BTC",
        type: "CRYPTO",
      };
    case "ETH":
      return {
        ...state,
        shorthand: "ETH",
        symbol: "ETH",
        type: "CRYPTO",
      };

    default:
      return state;
  }
};
