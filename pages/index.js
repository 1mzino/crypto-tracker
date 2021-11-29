import {
  useColorModeValue,
  Text,
  Icon,
  Stack,
  Heading,
  HStack,
  Center,
  Button,
  IconButton,
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

import { GoSettings } from "react-icons/go";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";

export const getStaticProps = async () => {
  const globalMarketData = await coinService.getMarketData();
  const trendingCoins = await coinService.getTrendingCoins();
  const tableData = await coinService.getTableData();

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

const globalMarketDataFetcher = async (url) => {
  const res = await (await fetch(url)).json().then((res) => res.data);
  return {
    volume: res.total_volume,
    market_cap: res.total_market_cap,
    market_cap_change: res.market_cap_change_percentage_24h_usd,
    active_cryptos: res.active_cryptocurrencies,
    dominance: res.market_cap_percentage,
  };
};

const trendingCoinsFetcher = async (url) => {
  const res = await (await fetch(url)).json();
  return res.coins.map((coin) => coin.item);
};

const tableDataFetcher = async (url) => {
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
};

export default function Home({ fallback }) {
  const [pageIndex, setPageIndex] = useState(1);
  const { currency } = useContext(CurrencyContext);

  const { data: globalMarketData } = useSWR(
    "https://api.coingecko.com/api/v3/global",
    globalMarketDataFetcher,
    { fallback }
  );

  const { data: trendingCoins } = useSWR(
    "https://api.coingecko.com/api/v3/search/trending",
    trendingCoinsFetcher,
    { fallback }
  );

  const { data: tableData } = useSWR(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp&order=market_cap_desc&per_page=10&page=${pageIndex}&sparkline=true&price_change_percentage=24h%2C7d%2C`,
    tableDataFetcher,
    { fallback }
  );

  useEffect(() => {
    smoothscroll.polyfill();
  }, []);

  return (
    <Stack>
      {/* Intro text and trending coins displayed on carousel */}
      <Stack
        spacing={[4, null, null, null, 24]}
        direction={["column", null, null, null, "row"]}
      >
        <Stack pt={[0, null, null, 2]} minW={[null, null, "max-content"]}>
          <Heading fontWeight={600} fontSize={["md", null, "2xl"]}>
            Todays Cryptocurrency prices
          </Heading>

          <Text
            color={useColorModeValue("gray.600", "gray.300")}
            fontSize={["sm", null, "14.5px"]}
          >
            The global crypto market cap is{" "}
            <Text as="span" fontWeight={600}>
              {`${currency.symbol}${getRoundedNum(
                globalMarketData.market_cap[currency.shorthand.toLowerCase()]
              ).toString()},`}
            </Text>{" "}
            a {getColouredNum(globalMarketData.market_cap_change)}{" "}
            {globalMarketData.market_cap_change < 0
              ? " decrease over the last day. "
              : " increase over the last day. "}
          </Text>
        </Stack>

        <Carousel data={trendingCoins} />
      </Stack>

      {/* Table Header/Button Navigation  */}
      {!tableData ? (
        <Center>
          <Spinner my="32" color="blue.500" />
        </Center>
      ) : (
        <>
          <HStack pt={[2, null, 4]}>
            <Button size="sm" fontSize="xs">
              <HStack>
                <Icon h="14px" w="14px" color="gray.500" as={GoSettings} />
                <Text>Categories</Text>
              </HStack>
            </Button>
          </HStack>

          <CoinTable data={tableData} />

          {/* Pagination */}
          <HStack py={2} px={8} justify="center">
            <IconButton
              disabled={pageIndex === 1 ? true : false}
              bg="none"
              _hover={{ bg: "none" }}
              size="xs"
              onClick={() => {
                setPageIndex(pageIndex - 1);
                window.scroll({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              icon={<BsChevronLeft />}
            />
            <Button size="sm">1</Button>

            <Button size="sm" bg="none">
              2
            </Button>
            <Button size="sm" bg="none">
              3
            </Button>
            <Button size="sm" bg="none">
              4
            </Button>
            <Button size="sm" bg="none">
              ...
            </Button>
            <Button size="sm" bg="none">
              999
            </Button>

            <IconButton
              bg="none"
              _hover={{ bg: "none" }}
              size="xs"
              onClick={() => {
                setPageIndex(pageIndex + 1);
                window.scroll({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              icon={<BsChevronRight />}
            />
          </HStack>
        </>
      )}
    </Stack>
  );
}
