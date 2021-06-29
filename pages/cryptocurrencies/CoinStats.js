import {
  Wrap,
  WrapItem,
  Stack,
  Text,
  HStack,
  Icon,
  Spacer,
  Flex,
  Center,
  useDisclosure,
  Box,
  Collapse,
  SimpleGrid,
  GridItem,
  Button,
  Heading,
} from "@chakra-ui/react";

import {
  BsFillCaretUpFill,
  BsFillCaretDownFill,
  BsChevronDown,
  BsChevronUp,
} from "react-icons/bs";
import { useState, useEffect } from "react";

const coinStats = ({ coinStats }) => {
  const { isOpen, onToggle } = useDisclosure();
  const [collapseHeight, setCollapseHeight] = useState(45);

  const getResized = (height) => {
    timeout = setTimeout(() => {
      setCollapseHeight(height);
    }, 150);
  };

  let timeout = null;

  const handleResize = () => {
    const screenWidth = window.innerWidth;
    clearTimeout(timeout);

    if (screenWidth < 992) {
      getResized(45);
      console.log(`set height to 55`);
    }
    // if (screenWidth > 992) {
    //   getResized(75);
    //   console.log(`set height to 70`);
    // }
  };

  useEffect(() => {
    const screenWidth = window.innerWidth;

    if (screenWidth < 992) {
      setCollapseHeight(45);
    }
    // if (screenWidth > 992) {
    //   setCollapseHeight(75);
    // }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    // PRICE, LABEL, 24H, 7D, ATH 24H, 1M, 1Y, ALL TIME, MARKET CAP, DILUTED MARKET CAP, VOLUME, CONVERSION RATE
    <>
      <Collapse
        in={isOpen}
        endingHeight={"max-content"}
        startingHeight={collapseHeight}
      >
        <Flex
          display={["flex", null, null, "none"]}
          px={[1, null, null, 2]}
          justify="space-between"
        >
          {/* <Box
          px="10px"
          pos="absolute"
          right={10}
          as="button"
          bg="none"
          zIndex="99999"
          fontSize={["8px", null, "9px", null, "11px"]}
          size="xs"
          onClick={onToggle}
          color="gray.400"
        >
          <Flex align="center" justify="space-between">
            <Text display={["none", "initial"]}>
              {isOpen ? `View Less` : `View More`}
            </Text>
            <Icon
              ml={[1, null, null, 2]}
              onClick={onToggle}
              h="8px"
              w="8px"
              as={isOpen ? BsChevronUp : BsChevronDown}
              cursor="pointer"
            />
          </Flex>
        </Box> */}

          <Wrap direction={["column", null, "initial"]} spacing={[2, null, 4]}>
            <HStack spacing={6} pr={2}>
              <Flex flexDir="column">
                <Text
                  noOfLines={1.5}
                  fontSize="xs"
                  opacity="50%"
                  fontWeight="500"
                >
                  Price
                </Text>
                {coinStats.market_data.current_price.gbp < 1 ? (
                  <Text fontSize={["md", "lg", null, "xl"]} fontWeight="700">
                    £
                    {coinStats.market_data.current_price.gbp.toLocaleString(
                      undefined,
                      {
                        maximumFractionDigits: 9,
                      }
                    )}
                  </Text>
                ) : (
                  <Text fontSize={["md", "lg", null, "xl"]} fontWeight="700">
                    £
                    {coinStats.market_data.current_price.gbp.toLocaleString(
                      undefined,
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}
                  </Text>
                )}
              </Flex>
              <Flex flexDir="column">
                <Text fontSize="xs" opacity="50%" fontWeight="500">
                  24h %
                </Text>

                {coinStats.market_data.price_change_percentage_24h > 0 ? (
                  <Flex align="center" color="green.400">
                    <BsFillCaretUpFill />
                    <Text
                      ml={1}
                      fontSize={["md", "lg", null, "xl"]}
                      fontWeight="700"
                    >
                      {coinStats.market_data.price_change_percentage_24h.toFixed(
                        2
                      )}
                      %
                    </Text>
                  </Flex>
                ) : (
                  <Flex align="center" color="red.400">
                    <BsFillCaretDownFill />
                    <Text
                      ml={1}
                      fontSize={["md", "lg", null, "xl"]}
                      fontWeight="700"
                    >
                      {Math.abs(
                        coinStats.market_data.price_change_percentage_24h.toFixed(
                          2
                        )
                      )}
                      %
                    </Text>
                  </Flex>
                )}
              </Flex>

              <Flex flexDir="column">
                <Text fontSize="xs" opacity="50%" fontWeight="500">
                  7d %
                </Text>
                {coinStats.market_data.price_change_percentage_7d > 0 ? (
                  <Flex align="center" color="green.400">
                    <BsFillCaretUpFill />
                    <Text
                      ml={1}
                      fontSize={["md", "lg", null, "xl"]}
                      fontWeight="700"
                    >
                      {coinStats.market_data.price_change_percentage_7d.toFixed(
                        2
                      )}
                      %
                    </Text>
                  </Flex>
                ) : (
                  <Flex align="center" color="red.400">
                    <BsFillCaretDownFill />
                    <Text
                      ml={1}
                      fontSize={["md", "lg", null, "xl"]}
                      fontWeight="700"
                    >
                      {Math.abs(
                        coinStats.market_data.price_change_percentage_7d.toFixed(
                          2
                        )
                      )}
                      %
                    </Text>
                  </Flex>
                )}
              </Flex>
            </HStack>

            <Stack pr={1} spacing={0} direction="column">
              <Text noOfLines={1} fontSize="xs" opacity="50%" fontWeight="500">
                Market Cap
              </Text>
              <Text fontSize={["md", "lg", null, "xl"]} fontWeight="700">
                £
                {coinStats.market_data.market_cap.gbp.toLocaleString(
                  undefined,
                  {
                    maximumFractionDigits: 2,
                  }
                )}
              </Text>
            </Stack>

            {/* <Flex pr="2rem" w="max-content" flexDir="column">
          <Text
          noOfLines={1}
          fontSize={["10px", "xs", null, null, "sm"]}
          opacity="50%"
          fontWeight="500"
          >
          Diluted Market Cap
          </Text>
          
          <Text fontSize={["lg", null, "2xl"]} fontWeight="700">
          £
          {coinStats.market_data.fully_diluted_valuation.gbp.toLocaleString(
            undefined,
            {
              minimumFractionDigits: 0,
              maxiimumFractionDigits: 2,
            }
            )}
            </Text>
            
          </Flex> */}

            <Stack pr={1} spacing={0} direction="column">
              <Text fontSize="xs" opacity="50%" fontWeight="500">
                Volume
              </Text>
              <Text fontSize={["md", "lg", null, "xl"]} fontWeight="700">
                £
                {coinStats.market_data.total_volume.gbp.toLocaleString(
                  undefined,
                  {
                    maximumFractionDigits: 2,
                  }
                )}
              </Text>
            </Stack>

            <Stack pr={1} spacing={0} direction="column">
              <Text fontSize="xs" opacity="50%" fontWeight="500">
                Circulating Supply
              </Text>
              <Text fontSize={["md", "lg", null, "xl"]} fontWeight="700">
                {`${coinStats.market_data.circulating_supply.toLocaleString(
                  undefined,
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )}
                ${coinStats.symbol.toUpperCase()}`}
              </Text>
            </Stack>
            <Stack pr={1} spacing={0} direction="column">
              <Text fontSize="xs" opacity="50%" fontWeight="500">
                All Time High Price
              </Text>
              {coinStats.market_data.ath.gbp < 1 ? (
                <Text fontSize={["md", "lg", null, "xl"]} fontWeight="700">
                  £
                  {coinStats.market_data.ath.gbp.toLocaleString(undefined, {
                    maximumFractionDigits: 9,
                  })}
                </Text>
              ) : (
                <Text fontSize={["md", "lg", null, "xl"]} fontWeight="700">
                  £
                  {coinStats.market_data.ath.gbp.toLocaleString(undefined, {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  })}
                </Text>
              )}
            </Stack>
            {/* <Stack pr={1} spacing={0} direction="column">
              <Text
              fontSize={["11px", null, null, "xs"]}
              opacity="50%"
                fontWeight="500"
              >
                Total Supply
              </Text>
              {coinStats.market_data.max_supply === undefined ? null : (
                <Text fontSize={["md", "lg", null, "xl"]} fontWeight="700">
                  {`${coinStats.market_data.total_supply.toLocaleString(
                    undefined,
                    {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2,
                    }
                  )}
              ${coinStats.symbol.toUpperCase()}`}
                </Text>
              )}
            </Stack> */}
          </Wrap>
          <Flex
            h="max-content"
            pl="5px"
            align="flex-start"
            as="button"
            fontSize={["8px", null, "9px", null, "10px"]}
            size="xs"
            onClick={onToggle}
            color="gray.400"
          >
            <Flex align="center">
              <Text noOfLines={1} w="max-content" display={["none", "initial"]}>
                {isOpen ? `Less` : `More`}
              </Text>
              <Icon
                ml={[1, null, null, 2]}
                onClick={onToggle}
                h="8px"
                w="8px"
                as={isOpen ? BsChevronUp : BsChevronDown}
                cursor="pointer"
              />
            </Flex>
          </Flex>
        </Flex>
      </Collapse>
    </>
  );
};

export default coinStats;
