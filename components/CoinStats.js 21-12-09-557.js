import {
  useMediaQuery,
  useDisclosure,
  useColorModeValue,
  Button,
  Flex,
  Collapse,
  Stack,
  Divider,
  HStack,
  Text,
  Icon,
  Box,
  Spacer,
  SimpleGrid,
} from "@chakra-ui/react";

import { getColouredNum } from "../../utils/getColoredNumber";

import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";

const CoinStats = ({ coin, currency }) => {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const { isOpen: isMoreStatsOpen, onToggle: onMoreStatsToggle } =
    useDisclosure();

  return (
    <>
      {!isMoreStatsOpen && (
        <Button
          display={["flex", null, "none"]}
          onClick={onMoreStatsToggle}
          fontSize="sm"
        >
          More Stats
        </Button>
      )}
      <Collapse display={["flex", null, "none"]} in={isMoreStatsOpen}>
        <Stack display={["flex", null, "none"]} fontSize="xs" spacing={4}>
          <HStack>
            <Text>Market Cap</Text>
            <Spacer />
            <HStack fontWeight={600}>
              <Text fontSize="sm">
                {`${currency.symbol}${coin.market_data.market_cap[
                  currency.shorthand.toLowerCase()
                ].toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })}`}
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
                fontSize="xx-small"
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
          </HStack>

          {Object.keys(coin.market_data.fully_diluted_valuation).length > 1 ? (
            <>
              <Divider />
              <HStack>
                <Text>Fully Diluted Valuation</Text>
                <Spacer />

                <Text fontSize="sm" fontWeight={600}>
                  {`${
                    currency.symbol
                  }${coin.market_data.fully_diluted_valuation[
                    currency.shorthand.toLowerCase()
                  ].toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}`}
                </Text>
              </HStack>
            </>
          ) : null}

          <Divider />
          <HStack>
            <Text>Volume</Text>
            <Spacer />

            <Text fontSize="sm" fontWeight={600}>
              {`${currency.symbol}${coin.market_data.total_volume[
                currency.shorthand.toLowerCase()
              ].toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })}`}
            </Text>
          </HStack>
          <Divider />
          <Stack>
            <HStack>
              <Text>Circulating Supply</Text>
              <Spacer />
              <Text whiteSpace="nowrap" fontSize="sm" fontWeight={600}>
                {`${coin.market_data.circulating_supply.toLocaleString(
                  undefined,
                  {
                    maximumFractionDigits: 0,
                  }
                )} ${coin.symbol.toUpperCase()}`}
              </Text>
            </HStack>

            <HStack fontSize="x-small">
              <Text>Max Supply</Text>
              <Spacer />

              <Text fontWeight={600}>
                {coin.market_data.max_supply
                  ? coin.market_data.max_supply.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })
                  : "--"}
              </Text>
            </HStack>

            <HStack fontSize="x-small">
              <Text>Total Supply</Text>
              <Spacer />
              <Text fontWeight={600}>
                {coin.market_data.total_supply
                  ? coin.market_data.total_supply.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })
                  : "--"}
              </Text>
            </HStack>
          </Stack>

          <Button onClick={onMoreStatsToggle} fontSize="sm">
            Less Stats
          </Button>
        </Stack>
      </Collapse>

      <Box
        pt={2}
        // display={["none", null, "block"]}
        // flexBasis={["100%", null, null, null, "60%"]}
        // order={4}
      >
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
                  {`${currency.symbol}${coin.market_data.market_cap[
                    currency.shorthand.toLowerCase()
                  ].toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 6,
                  })}`}
                </Text>

                {getColouredNum(
                  coin.market_data.market_change24h[
                    currency.shorthand.toLowerCase()
                  ]
                )}
              </Stack>
            </Stack>
          </Box>
          {Object.keys(coin.market_data.fully_diluted_valuation).length > 0 ? (
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

                <Text fontSize="sm">
                  {`${
                    currency.symbol
                  }${coin.market_data.fully_diluted_valuation[
                    currency.shorthand.toLowerCase()
                  ].toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 6,
                  })}`}
                </Text>
              </Stack>
            </Box>
          ) : null}

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
                  {`${currency.symbol}${coin.market_data.total_volume[
                    currency.shorthand.toLowerCase()
                  ].toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 6,
                  })}`}
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
