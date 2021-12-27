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
  Flex,
  IconButton,
  Spacer,
  Text,
  Container,
  Icon,
  Box,
  Button,
  Collapse,
  Divider,
} from "@chakra-ui/react";

import useSWR from "swr";
import { useRouter } from "next/router";
import { useContext } from "react";
import { CurrencyContext } from "../../contexts/CurrencyContext";

import Slider from "../../components/Slider";
import CoinStats from "../../components/CoinStats";
import CoinLinks from "../../components/CoinLinks";

import {
  BsChevronRight,
  BsChevronDown,
  BsFillCaretDownFill,
  BsFillCaretUpFill,
} from "react-icons/bs";
import { getCurrencyFormat } from "../../utils/getCurrencyFormat";

const fetcher = async (url) => {
  const res = await (await fetch(url)).json();
  console.log(res);
  return {
    name: res.name,
    image: res.image.large,
    market_cap_rank: res.market_cap_rank,
    symbol: res.symbol,
    category: res.categories,

    links: {
      homepage: res.links.homepage,
      reddit: res.subreddit_url,
      blockchain: res.links.blockchain_site,
      forum: res.links.official_forum_url,
      chat: res.links.chat_url,
    },

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
    `https://api.coingecko.com/api/v3/coins/${router.query.coin}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`,
    fetcher
  );

  if (coin) {
    console.log(coin);
  }

  // return (
  //   <Stack
  //     as="section"
  //     // bg={useColorModeValue("white", "gray.900")}
  //     borderRadius="xl"
  //     px={4}
  //     py={6}
  //     spacing={[4, null, 0]}
  //     direction={["column", null, "row"]}
  //     flexWrap="wrap"
  //   >
  //     <Stack
  //       spacing={4}
  //       flexBasis="45%"
  //       justify={["flex-start", null, "center"]}
  //       pb={[0, null, 6]}
  //     >
  //       <HStack spacing={4}>
  //         <Image
  //           ignoreFallback
  //           userSelect="none"
  //           borderRadius="lg"
  //           cursor="pointer"
  //           objectFit="fill"
  //           w={["32px", null, null, "36px"]}
  //           h={["32px", null, null, "36px"]}
  //           borderRadius="20%"
  //           src={coin.image}
  //           alt=""
  //         />
  //         <Heading as="h1" fontSize={["2xl", null, null, "3xl"]}>
  //           {coin.name}
  //         </Heading>
  //       </HStack>

  //       <HStack>
  //         <Tag overflow="hidden" whiteSpace="nowrap" fontSize="x-small">
  //           {`Rank #${coin.market_cap_rank}`}
  //         </Tag>
  //         <Tag overflow="hidden" whiteSpace="nowrap" fontSize="x-small">
  //           {coin.symbol.toUpperCase()}
  //         </Tag>

  //         {coin.category ? (
  //           <Tag overflow="hidden" whiteSpace="nowrap" fontSize="x-small">
  //             {coin.category}
  //           </Tag>
  //         ) : null}
  //       </HStack>
  //     </Stack>

  // <Stack flexBasis="55%" h="130px">
  //   <Flex
  //     flexDir="column"
  //     align={[null, null, "flex-end", null, "flex-start"]}
  //   >
  //     <Text
  //       fontWeight={500}
  //       color={useColorModeValue("gray.600", "gray.400")}
  //       fontSize="xs"
  //     >
  //       {`${coin.name} Price (${coin.symbol.toUpperCase()})`}
  //     </Text>

  //     <HStack
  //       spacing={[null, null, 4]}
  //       justify={["space-between", null, "flex-start"]}
  //     >
  //       <Text fontSize={["2xl", null, null, "3xl"]} fontWeight={700}>
  //         {`${currency.symbol}${coin.market_data.current_price[
  //           currency.shorthand.toLowerCase()
  //         ].toLocaleString(undefined, {
  //           minimumFractionDigits: 2,
  //           maximumFractionDigits: 9,
  //         })}`}
  //       </Text>

  //       <Text
  //         borderRadius="md"
  //         color="white"
  //         bg={
  //           coin.market_data.price_change24h[
  //             currency.shorthand.toLowerCase()
  //           ] > 0
  //             ? "green.500"
  //             : "red.600"
  //         }
  //         px={2}
  //         py={1}
  //         fontSize="xs"
  //         fontWeight={600}
  //       >
  //         <Text as="span" pe={1}>
  //           <Icon
  //             h={2}
  //             as={
  //               coin.market_data.price_change24h[
  //                 currency.shorthand.toLowerCase()
  //               ] > 0
  //                 ? BsFillCaretUpFill
  //                 : BsFillCaretDownFill
  //             }
  //           />
  //         </Text>
  //         {`${Math.abs(
  //           coin.market_data.price_change24h[
  //             currency.shorthand.toLowerCase()
  //           ]
  //         ).toFixed(2)}%`}
  //       </Text>
  //     </HStack>
  //   </Flex>
  //   <Slider coin={coin} />
  // </Stack>

  //     <CoinStats coin={coin} currency={currency} />
  //     <CoinLinks coin={coin} />

  //     <Stack pt={2}>
  //       <Heading as="h2" fontSize="lg">{`${
  //         coin.name
  //       } to ${currency.shorthand.toUpperCase()} Chart`}</Heading>
  //     </Stack>
  //   </Stack>
  // );

  if (!coin) {
    return (
      <Flex
        zIndex={-1}
        pos="absolute"
        top="0"
        left="0"
        w="100%"
        h="100%"
        align="center"
        justify="center"
        bg={useColorModeValue("gray.50", "gray.800")}
        bgGradient={useColorModeValue(
          "",
          "linear(to-b, gray.800, gray.900, gray.900)"
        )}
      >
        <Spinner color="blue.500" />
      </Flex>
    );
  }

  return (
    <Flex
      flexDir="column"
      as="main"
      borderRadius="xl"
      px={4}
      py={2}
      bg={useColorModeValue("white", "gray.900")}
      shadow="sm"
    >
      <Flex flexDir={["column", null, "row"]} flexWrap="wrap">
        <Stack
          mt={[4, null, 2]}
          mb={[4]}
          flexBasis="40%"
          spacing={4}
          justify={["flex-start", null, "center"]}
        >
          <HStack maxW="max-content" cursor="pointer" spacing={4}>
            <Image
              ignoreFallback
              userSelect="none"
              borderRadius="lg"
              objectFit="contain"
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

          <HStack>
            <Tag overflow="hidden" whiteSpace="nowrap" fontSize="x-small">
              {`Rank #${coin.market_cap_rank}`}
            </Tag>
            <Tag overflow="hidden" whiteSpace="nowrap" fontSize="x-small">
              {coin.symbol.toUpperCase()}
            </Tag>

            {coin.category.length > 0 && (
              <Tag overflow="hidden" whiteSpace="nowrap" fontSize="x-small">
                {coin.category[0]}
              </Tag>
            )}
          </HStack>
        </Stack>

        <Stack my={[4, null, 2]} flexBasis="60%">
          <Flex
            flexDir="column"
            align={[null, null, "flex-end", null, "flex-start"]}
          >
            <Text color="gray.500" fontWeight={500} fontSize="xs">
              {`${coin.name} Price (${coin.symbol.toUpperCase()})`}
            </Text>

            <HStack
              spacing={[null, null, 4]}
              justify={["space-between", null, "flex-start"]}
            >
              <Text fontSize={["2xl", null, null, "3xl"]} fontWeight={700}>
                {getCurrencyFormat(
                  currency,
                  coin.market_data.current_price[
                    currency.shorthand.toLowerCase()
                  ].toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 6,
                  })
                )}
              </Text>

              <Text
                borderRadius="md"
                color="white"
                bg={
                  coin.market_data.price_change24h[
                    currency.shorthand.toLowerCase()
                  ] > 0
                    ? "green.500"
                    : "red.600"
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
                  coin.market_data.price_change24h[
                    currency.shorthand.toLowerCase()
                  ]
                ).toFixed(2)}%`}
              </Text>
            </HStack>
          </Flex>
          <Slider coin={coin} />
        </Stack>
        <CoinStats coin={coin} currency={currency} />
        <CoinLinks links={coin.links} />
      </Flex>
    </Flex>
  );
};

export default coinDetail;
