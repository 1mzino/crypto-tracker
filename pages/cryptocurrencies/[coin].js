import {
  useMediaQuery,
  useColorModeValue,
  HStack,
  Center,
  Spinner,
  Heading,
  Image,
  Tag,
  Stack,
  Spacer,
  Text,
  Icon,
  Divider,
} from "@chakra-ui/react";

import useSWR from "swr";
import { useRouter } from "next/router";
import { useContext } from "react";
import { CurrencyContext } from "../../contexts/CurrencyContext";

import CoinStats from "../../components/CoinStats";
import CoinLinks from "../../components/CoinLinks";
import Slider from "../../components/Slider";

import {
  BsChevronRight,
  BsFillCaretDownFill,
  BsFillCaretUpFill,
} from "react-icons/bs";

const fetcher = async (url) => {
  const res = await (await fetch(url)).json();
  return {
    name: res.name,
    image: res.image.large,
    market_cap_rank: res.market_cap_rank,
    symbol: res.symbol,
    category: res.categories[0],
    links: res.links,

    market_data: {
      current_price: res.market_data.current_price,
      market_cap: res.market_data.market_cap,
      fully_diluted_valuation: res.market_data.fully_diluted_valuation,
      price_change24h: res.market_data.price_change_percentage_24h_in_currency,
      market_change24h:
        res.market_data.market_cap_change_percentage_24h_in_currency,
      all_time_low: res.market_data.atl,
      all_time_high: res.market_data.ath,
      atl_24h: res.market_data.low_24h,
      ath_24h: res.market_data.high_24h,
      total_volume: res.market_data.total_volume,
      circulating_supply: res.market_data.circulating_supply,
      max_supply: res.market_data.max_supply,
      total_supply: res.market_data.total_supply,
    },
  };
};
const coinDetail = () => {
  const router = useRouter();
  const { currency } = useContext(CurrencyContext);

  const { data: coin } = useSWR(
    `https://api.coingecko.com/api/v3/coins/${router.query.coin}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=true&sparkline=false`,
    fetcher
  );

  console.log(coin);

  if (!coin)
    return (
      <Center>
        <Spinner my="32" color="blue.500" />
      </Center>
    );

  return (
    <Stack
      bg={useColorModeValue("white", "gray.900")}
      borderRadius="xl"
      px={[4, null, null, 4]}
      py={[4, null, null, 6]}
      spacing={[4, null, null, 6]}
    >
      {/* Coin Logo and Name */}
      <HStack spacing={4}>
        <Image
          ignoreFallback
          userSelect="none"
          borderRadius="lg"
          cursor="pointer"
          objectFit="fill"
          w={["32px", null, null, "36px"]}
          h={["32px", null, null, "36px"]}
          borderRadius="20%"
          src={coin.image}
          alt=""
        />
        <Heading as="h1" fontSize={["2xl", null, null, "3xl"]}>
          {coin.name}
        </Heading>
      </HStack>

      {/* Coin Tags */}
      <HStack>
        <Tag overflow="hidden" whiteSpace="nowrap" fontSize="x-small">
          {`Rank #${coin.market_cap_rank}`}
        </Tag>
        <Tag overflow="hidden" whiteSpace="nowrap" fontSize="x-small">
          {coin.symbol.toUpperCase()}
        </Tag>

        {coin.category ? (
          <Tag overflow="hidden" whiteSpace="nowrap" fontSize="x-small">
            {coin.category}
          </Tag>
        ) : null}
      </HStack>

      <Divider />

      {/* Coin Price and 24h Price Change */}
      <Stack spacing={0}>
        <Text fontWeight={600} fontSize="xs">
          {`${coin.name} Price `}
          <Text
            as="span"
            fontSize="xx-small"
            fontWeight={400}
          >{`(${coin.symbol.toUpperCase()})`}</Text>
        </Text>

        <HStack>
          <Text fontSize="2xl" fontWeight={700}>{`
          ${currency.symbol}${coin.market_data.current_price[
            currency.shorthand.toLowerCase()
          ].toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 9,
          })}`}</Text>

          <Spacer />

          <Text
            borderRadius="md"
            color="white"
            bg={
              coin.market_data.price_change24h[
                currency.shorthand.toLowerCase()
              ] > 0
                ? "green.500"
                : "red.500"
            }
            px={2}
            py={1}
            fontSize="xs"
            fontWeight={600}
          >
            <Text as="span" pe={1}>
              <Icon
                h={2}
                as={
                  coin.market_data.price_change24h[
                    currency.shorthand.toLowerCase()
                  ] > 0
                    ? BsFillCaretUpFill
                    : BsFillCaretDownFill
                }
              />
            </Text>
            {`${Math.abs(
              coin.market_data.price_change24h[currency.shorthand.toLowerCase()]
            ).toFixed(2)}%`}
          </Text>
        </HStack>
      </Stack>

      {/* 24h high and low + ATH/ATL Slider */}
      <Slider coin={coin} currency={currency} />

      <Spacer />

      {/* More Coin Stats */}
      <CoinStats coin={coin} currency={currency} />

      {/* Coin Links + Contracts */}
      <CoinLinks coin={coin} />

      {/* <Stack pt={2}>
        <Heading as="h2" fontSize="lg">{`${
          coin.name
        } to ${currency.shorthand.toUpperCase()} Chart`}</Heading>
      </Stack> */}
    </Stack>
  );
};

export default coinDetail;
