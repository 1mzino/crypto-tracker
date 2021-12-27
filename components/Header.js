import { HStack, Divider, Text, Spinner, Box } from "@chakra-ui/react";
import { useContext } from "react";

import { CurrencyContext } from "../contexts/CurrencyContext";
import { getCurrencyFormat } from "../utils/getCurrencyFormat";
import useGlobalData from "../hooks/useGlobalData";

const HeaderTag = ({ title, content }) => {
  return (
    <HStack as="span">
      <Text>{title}</Text>
      <Text as="span" color="blue.500">
        {!content ? (
          <Spinner h="10px" w="10px" speed="0.75s" thickness="1.5px" />
        ) : (
          <Text>{content}</Text>
        )}
      </Text>
    </HStack>
  );
};

const Header = () => {
  const { currency } = useContext(CurrencyContext);
  const { marketData } = useGlobalData();
  console.log("market data", marketData);

  return (
    <Box order={[null, null, null, -1]}>
      <HStack
        as="header"
        spacing={4}
        py={2}
        fontWeight={600}
        fontSize="x-small"
        whiteSpace="nowrap"
        overflowX="scroll"
        sx={{
          "&::-webkit-scrollbar": {
            display: "none",
            width: 0,
          },
          scrollbarWidth: "none",
        }}
      >
        <HeaderTag
          title={"Cryptos: "}
          content={marketData && marketData.active_cryptos}
        />

        <HeaderTag
          title={"Market Cap: "}
          content={
            marketData &&
            getCurrencyFormat(
              currency,
              marketData.market_cap[
                currency.shorthand.toLowerCase()
              ].toLocaleString(undefined, { maximumFractionDigits: 2 })
            )
          }
        />

        <HeaderTag
          title={"Volume: "}
          content={
            marketData &&
            getCurrencyFormat(
              currency,
              marketData.volume[
                currency.shorthand.toLowerCase()
              ].toLocaleString(undefined, { maximumFractionDigits: 2 })
            )
          }
        />

        <HeaderTag
          title={"Dominance: "}
          content={
            marketData &&
            `${Object.keys(
              marketData.dominance
            )[0].toUpperCase()}: ${marketData.dominance[
              Object.keys(marketData.dominance)[0]
            ].toFixed(1)}% ${Object.keys(
              marketData.dominance
            )[1].toUpperCase()}: ${marketData.dominance[
              Object.keys(marketData.dominance)[1]
            ]?.toFixed(1)}%`
          }
        />
      </HStack>

      <Divider pos="absolute" left="0" />
    </Box>
  );
};

export default Header;
