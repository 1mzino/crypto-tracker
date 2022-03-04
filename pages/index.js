import {
  useColorModeValue,
  Flex,
  Stack,
  Heading,
  Text,
  Spinner,
} from "@chakra-ui/react";

import { useState, useContext, useEffect } from "react";
import useSWR from "swr";
import smoothscroll from "smoothscroll-polyfill";

import { CurrencyContext } from "../contexts/CurrencyContext";

import Carousel from "../components/Carousel";
import CoinTable from "../components/Table";

import coinService from "../fetchers/coin";

import { getRoundedNum } from "../utils/getRoundedNumber";
import { getColouredNum } from "../utils/getColoredNumber";

export const getStaticProps = async () => {
  const globalMarketData = await coinService.getMarketData();
  const trendingCoins = await coinService.getTrendingCoins();
  const tableData = await coinService.getTableData();

  /* ideally prefetch supported currencies to make use of all currencies available,
  then store supported currencies in browsers cache to make available for use in 
  currency selector component, however API currently doesnt offer any ways to differentiate
  FIAT from CRYPTO, therefore supported currencies will be limited to array (see currencyselector component)
  */

  return {
    props: {
      fallback: {
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp&order=market_cap_desc&per_page=10&page=1&sparkline=true&price_change_percentage=24h%2C7d%2C":
          tableData,
        "https://api.coingecko.com/api/v3/global": globalMarketData,
        "https://api.coingecko.com/api/v3/search/trending": trendingCoins,
      },
    },
  };
};

export default function Home({ fallback }) {
  const { currency } = useContext(CurrencyContext);
  console.log("CURRENCY", currency);
  const [pageIndex, setPageIndex] = useState(1);

  // useSWR to revalidate props
  const { data: globalMarketData } = useSWR(
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
    },
    { fallback }
  );
  const { data: trendingCoins } = useSWR(
    "https://api.coingecko.com/api/v3/search/trending",
    async (url) => {
      const res = await (await fetch(url)).json();
      return res.coins.map((coin) => coin.item);
    },
    { fallback }
  );
  const { data: tableData } = useSWR(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp&order=market_cap_desc&per_page=10&page=${pageIndex}&sparkline=true&price_change_percentage=24h%2C7d%2C`,
    async (url) => {
      const res = await (await fetch(url)).json();
      const data = await Promise.all(
        res.map(
          async (coin) =>
            await (
              await fetch(
                `https://api.coingecko.com/api/v3/coins/${coin.id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`
              )
            ).json()
        )
      );
      return data.map((coin) => {
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
    },
    { fallback }
  );

  useEffect(() => {
    smoothscroll.polyfill();
  }, []);

  return (
    <Flex as="main" flexDir="column">
      <Stack
        // py={[1, null, 4]}

        py={[2, null, 4]}
        mb={4}
        spacing={[4, null, 6, null, 24]}
        direction={["column", null, null, null, "row"]}
      >
        <Stack as="article" minW={[null, null, "max-content"]} justify="center">
          <Heading fontWeight={[600, null, 600]} fontSize={["xl", null, "2xl"]}>
            Todays Cryptocurrency prices
          </Heading>

          <Text
            color={useColorModeValue("gray.600", "gray.300")}
            fontSize={["small", null, "sm"]}
          >
            {`The global crypto market cap is `}
            {currency.type !== "CRYPTO" ? (
              <Text as="span" fontWeight={600}>
                {`${currency.symbol}${getRoundedNum(
                  globalMarketData.market_cap[currency.shorthand.toLowerCase()]
                ).toString()}, `}
              </Text>
            ) : (
              <Text as="span" fontWeight={600}>
                {`${getRoundedNum(
                  globalMarketData.market_cap[currency.shorthand.toLowerCase()]
                ).toString()} ${currency.symbol}, `}
              </Text>
            )}
            a {getColouredNum(globalMarketData.market_cap_change)}
            {globalMarketData.market_cap_change < 0
              ? " decrease over the last day. "
              : " increase over the last day. "}
          </Text>
        </Stack>

        <Carousel data={trendingCoins} />
      </Stack>

      {!tableData ? (
        <Flex
          zIndex={-1}
          pos="absolute"
          bottom="0"
          left="0"
          w="100%"
          h="100%"
          align="center"
          justify="center"
        >
          <Spinner color="blue.500" />
        </Flex>
      ) : (
        <CoinTable
          data={tableData}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
        />
      )}
    </Flex>
  );
}
