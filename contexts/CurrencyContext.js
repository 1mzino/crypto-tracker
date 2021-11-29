import { createContext, useReducer, useEffect } from "react";
import { currencyReducer } from "../reducers/currencyReducer";

const CurrencyContext = createContext();

const CurrencyProvider = ({ children }) => {
  useEffect(() => {
    if (localStorage.getItem("supportedCurrencies") === null) return;

    dispatch({
      type: "GBP",
      supportedCurrencies: JSON.parse(
        localStorage.getItem("supportedCurrencies")
      ),
    });
  }, []);

  const [currency, dispatch] = useReducer(currencyReducer, {
    shorthand: "GBP",
    symbol: "£",
    type: "FIAT",
  });

  return (
    <CurrencyContext.Provider value={{ currency, dispatch }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export { CurrencyContext, CurrencyProvider };
