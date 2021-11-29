import {
  useMediaQuery,
  useDisclosure,
  Button,
  Collapse,
  Stack,
  Divider,
  HStack,
  Text,
  Icon,
  Spacer,
} from "@chakra-ui/react";

import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";

const CoinStats = ({ coin, currency }) => {
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");
  const { isOpen: isMoreStatsOpen, onToggle: onMoreStatsToggle } =
    useDisclosure();

  if (isLargerThan1280) return <div>DESKTOP VERSION</div>;

  return (
    <>
      {!isMoreStatsOpen ? (
        <Button size="sm" onClick={onMoreStatsToggle}>
          More stats
        </Button>
      ) : null}

      <Collapse in={isMoreStatsOpen}>
        <Stack fontSize="xs" spacing={4}>
          <Divider />
          <HStack>
            <Text>Market Cap</Text>
            <Spacer />
            <HStack spacing={1}>
              <Text fontSize="sm" fontWeight={600}>
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
                fontWeight={600}
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
              <HStack pe={1}>
                <Text>Fully Diluted Valuation</Text>
                <Spacer />

                <Text fontSize="sm" fontWeight={600}>
                  {`${
                    currency.symbol
                  }${coin.market_data.fully_diluted_valuation[
                    currency.shorthand.toLowerCase()
                  ].toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
                </Text>
              </HStack>
            </>
          ) : null}

          <Divider />
          <HStack pe={1}>
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
          <HStack pe={1}>
            <Text>Circulating Supply</Text>
            <Spacer />

            <Text fontSize="sm" fontWeight={600}>
              {`${coin.market_data.circulating_supply.toLocaleString(
                undefined,
                { maximumFractionDigits: 0 }
              )} ${coin.symbol.toUpperCase()}`}
            </Text>
          </HStack>

          <HStack fontSize="xs" pe={1}>
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

          <HStack fontSize="xs" pe={1}>
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

          <Divider />
          <Button size="sm" onClick={onMoreStatsToggle}>
            Less stats
          </Button>
        </Stack>
      </Collapse>
    </>
  );
};

export default CoinStats;
