import {
  useDisclosure,
  useColorModeValue,
  Box,
  Flex,
  Stack,
  HStack,
  Button,
  Icon,
  Text,
  Collapse,
  Divider,
  Spacer,
  SimpleGrid,
} from "@chakra-ui/react";

import { getCurrencyFormat } from "../utils/getCurrencyFormat";
import { getColouredNum } from "../utils/getColoredNumber";

import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";

const CoinStats = ({ coin, currency }) => {
  const { isOpen: isMoreStatsOpen, onToggle: onMoreStatsToggle } =
    useDisclosure();

  console.log(
    coin.market_data.current_price[currency.shorthand.toLowerCase()],
    typeof coin.market_data.current_price[currency.shorthand.toLowerCase()]
  );
  console.log(
    coin.market_data.total_supply,
    typeof coin.market_data.total_supply
  );

  console.log(
    coin.market_data.current_price[currency.shorthand.toLowerCase()] *
      coin.market_data.total_supply
  );
  return (
    <>
      {/* Mobile */}
      <Flex flexDir="column" display={["flex", null, "none"]} mt={4}>
        {!isMoreStatsOpen && (
          <Button fontSize="sm" onClick={onMoreStatsToggle}>
            More Stats
          </Button>
        )}

        <Collapse in={isMoreStatsOpen}>
          <Stack fontSize="small" spacing={4} divider={<Divider />}>
            <Flex justify="space-between">
              <Text>Market Cap</Text>
              <HStack fontWeight={600}>
                <Text fontSize="sm">
                  {getCurrencyFormat(
                    currency,
                    coin.market_data.market_cap[
                      currency.shorthand.toLowerCase()
                    ].toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })
                  )}
                </Text>
                <Text
                  color={
                    coin.market_data.market_change24h[
                      currency.shorthand.toLowerCase()
                    ] > 0
                      ? "green.500"
                      : "red.500"
                  }
                  py={1}
                  fontSize="x-small"
                >
                  <Text as="span">
                    <Icon
                      h={2}
                      as={
                        coin.market_data.market_change24h[
                          currency.shorthand.toLowerCase()
                        ] > 0
                          ? BsFillCaretUpFill
                          : BsFillCaretDownFill
                      }
                    />
                  </Text>
                  {`${Math.abs(
                    coin.market_data.market_change24h[
                      currency.shorthand.toLowerCase()
                    ]
                  ).toFixed(2)}%`}
                </Text>
              </HStack>
            </Flex>

            <Flex justify="space-between">
              <Text>Fully Diluted Valuation</Text>
              <Text fontSize="sm" fontWeight={600}>
                {/* 
                Fully Diluted Market Valuation = price x max supply,
                if max supply is null, pricd x total supply.
                */}

                {Object.keys(coin.market_data.fully_diluted_valuation).length >
                1
                  ? getCurrencyFormat(
                      currency,
                      coin.market_data.fully_diluted_valuation[
                        currency.shorthand.toLowerCase()
                      ].toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })
                    )
                  : coin.market_data.max_supply
                  ? getCurrencyFormat(
                      currency,
                      (
                        coin.market_data.current_price[
                          currency.shorthand.toLowerCase()
                        ] * coin.market_data.max_supply
                      ).toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })
                    )
                  : coin.market_data.total_supply
                  ? getCurrencyFormat(
                      currency,
                      (
                        coin.market_data.current_price[
                          currency.shorthand.toLowerCase()
                        ] * coin.market_data.total_supply
                      ).toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })
                    )
                  : "--"}
              </Text>
            </Flex>

            <Flex justify="space-between">
              <Text>Volume</Text>
              <Text fontSize="sm" fontWeight={600}>
                {getCurrencyFormat(
                  currency,
                  coin.market_data.total_volume[
                    currency.shorthand.toLowerCase()
                  ].toLocaleString(undefined, { maximumFractionDigits: 0 })
                )}
              </Text>
            </Flex>

            <Stack>
              <Flex justify="space-between">
                <Text>Circulating Supply</Text>
                <Text whiteSpace="nowrap" fontSize="sm" fontWeight={600}>
                  {`${coin.market_data.circulating_supply.toLocaleString(
                    undefined,
                    {
                      maximumFractionDigits: 0,
                    }
                  )} ${coin.symbol.toUpperCase()}`}
                </Text>
              </Flex>

              <Flex justify="space-between" fontSize="x-small">
                <Text>Max Supply</Text>

                <Text fontWeight={600}>
                  {coin.market_data.max_supply
                    ? coin.market_data.max_supply.toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })
                    : "--"}
                </Text>
              </Flex>

              <Flex justify="space-between" fontSize="x-small">
                <Text>Total Supply</Text>

                <Text fontWeight={600}>
                  {coin.market_data.total_supply
                    ? coin.market_data.total_supply.toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })
                    : "--"}
                </Text>
              </Flex>
            </Stack>

            <Button fontSize="sm" onClick={onMoreStatsToggle}>
              Less Stats
            </Button>
          </Stack>
        </Collapse>
      </Flex>

      <Box flexBasis="100%" display={["none", null, "block"]} order={4} mt={2}>
        <SimpleGrid
          borderTop="1px solid"
          borderColor={useColorModeValue("gray.100", "gray.800")}
          fontWeight={600}
          spacingX={4}
          minChildWidth="80px"
        >
          <Box py={4}>
            <Stack
              h="100px"
              borderRight="1px solid"
              borderColor={useColorModeValue("gray.100", "gray.800")}
              spacing={4}
            >
              <Text
                fontSize="small"
                color={useColorModeValue("gray.600", "gray.400")}
              >
                Market Cap
              </Text>
              <Stack spacing={1}>
                <Text>
                  {getCurrencyFormat(
                    currency,
                    coin.market_data.market_cap[
                      currency.shorthand.toLowerCase()
                    ].toLocaleString(undefined, {
                      maximumFractionDigits:
                        coin.market_data.market_cap[
                          currency.shorthand.toLowerCase()
                        ] < 1
                          ? 6
                          : 0,
                    })
                  )}
                </Text>

                {getColouredNum(
                  coin.market_data.market_change24h[
                    currency.shorthand.toLowerCase()
                  ]
                )}
              </Stack>
            </Stack>
          </Box>
          <Box py={4}>
            <Stack
              h="100px"
              borderRight="1px solid"
              borderColor={useColorModeValue("gray.100", "gray.800")}
              spacing={4}
            >
              <Text
                fontSize="small"
                color={useColorModeValue("gray.600", "gray.400")}
              >
                Fully Diluted Valuation
              </Text>

              <Text fontSize="sm" fontWeight={600}>
                {/* 
                Fully Diluted Market Valuation = price x max supply,
                if max supply is null, pricd x total supply.
                */}

                {Object.keys(coin.market_data.fully_diluted_valuation).length >
                1
                  ? getCurrencyFormat(
                      currency,
                      coin.market_data.fully_diluted_valuation[
                        currency.shorthand.toLowerCase()
                      ].toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })
                    )
                  : coin.market_data.max_supply
                  ? getCurrencyFormat(
                      currency,
                      (
                        coin.market_data.current_price[
                          currency.shorthand.toLowerCase()
                        ] * coin.market_data.max_supply
                      ).toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })
                    )
                  : coin.market_data.total_supply
                  ? getCurrencyFormat(
                      currency,
                      (
                        coin.market_data.current_price[
                          currency.shorthand.toLowerCase()
                        ] * coin.market_data.total_supply
                      ).toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })
                    )
                  : "--"}
              </Text>
            </Stack>
          </Box>

          <Box py={4}>
            <Stack
              h="100px"
              borderRight="1px solid"
              borderColor={useColorModeValue("gray.100", "gray.800")}
              spacing={[4, null, null, null, 8]}
            >
              <Stack spacing={4}>
                <Text
                  fontSize="small"
                  color={useColorModeValue("gray.600", "gray.400")}
                >
                  Total Volume (24h)
                </Text>

                <Text fontSize="sm">
                  {getCurrencyFormat(
                    currency,
                    coin.market_data.total_volume[
                      currency.shorthand.toLowerCase()
                    ].toLocaleString(undefined, {
                      maximumFractionDigits:
                        coin.market_data.total_volume < 1 ? 6 : 0,
                    })
                  )}
                </Text>
              </Stack>
            </Stack>
          </Box>
          <Box py={4}>
            <Stack spacing={6}>
              <Stack spacing={4}>
                <Text
                  fontSize="small"
                  color={useColorModeValue("gray.600", "gray.400")}
                >
                  Circulating Supply
                </Text>
                <Text fontSize="sm">
                  {`${coin.market_data.circulating_supply.toLocaleString(
                    undefined,
                    {
                      maximumFractionDigits: 3,
                    }
                  )} ${coin.symbol.toUpperCase()}`}
                </Text>
              </Stack>

              <Stack>
                <HStack fontSize="xx-small" pe={1}>
                  <Text color={useColorModeValue("gray.600", "gray.400")}>
                    Max Supply
                  </Text>
                  <Spacer />

                  <Text fontWeight={600}>
                    {coin.market_data.max_supply
                      ? coin.market_data.max_supply.toLocaleString(undefined, {
                          maximumFractionDigits: 0,
                        })
                      : "--"}
                  </Text>
                </HStack>

                <HStack fontSize="xx-small" pe={1}>
                  <Text color={useColorModeValue("gray.600", "gray.400")}>
                    Total Supply
                  </Text>
                  <Spacer />
                  <Text fontWeight={600}>
                    {coin.market_data.total_supply
                      ? coin.market_data.total_supply.toLocaleString(
                          undefined,
                          {
                            maximumFractionDigits: 0,
                          }
                        )
                      : "--"}
                  </Text>
                </HStack>
              </Stack>
            </Stack>
          </Box>
        </SimpleGrid>
      </Box>
    </>
  );
};

export default CoinStats;
