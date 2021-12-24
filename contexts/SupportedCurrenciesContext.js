import { createContext, useReducer, useState, useContext } from "react";

const SupportedCurrenciesContext = createContext();

const SupportedCurrenciesProvider = ({ children }) => {
  const supportedCurrencies = [
    {
      name: "Pound Sterling",
      symbol: "£",
      abv: "GBP",
      type: "FIAT",
      popular: true,
    },
    {
      name: "United States Dollar",
      symbol: "$",
      abv: "USD",
      type: "FIAT",
      popular: true,
    },
    {
      name: "Euro",
      symbol: "€",
      abv: "EUR",
      type: "FIAT",
      popular: true,
    },
    {
      name: "Bitcoin",
      symbol: "BTC",
      abv: "BTC",
      type: "CRYPTO",
      popular: true,
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      abv: "ETH",
      type: "CRYPTO",
      popular: true,
    },
    {
      name: "Bits",
      symbol: "BITS",
      abv: "BITS",
      type: "BITCOIN",
    },
    {
      name: "Satoshi",
      symbol: "SATS",
      abv: "SATS",
      type: "BITCOIN",
    },
  ];

  return (
    <SupportedCurrenciesContext.Provider value={{ supportedCurrencies }}>
      {children}
    </SupportedCurrenciesContext.Provider>
  );
};

export { SupportedCurrenciesContext, SupportedCurrenciesProvider };
