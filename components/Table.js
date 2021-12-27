import {
  Table,
  Thead,
  Image,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
  Box,
  HStack,
  Button,
  Stack,
  Text,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Portal,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Center,
  IconButton,
} from "@chakra-ui/react";
import Link from "next/link";
import { useContext, useState, useEffect, useReducer } from "react";

import { CurrencyContext } from "../contexts/CurrencyContext";

import _ from "lodash";

import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiOutlineStar,
  AiOutlinePieChart,
} from "react-icons/ai";
import { GoSettings } from "react-icons/go";
import {
  BsThreeDotsVertical,
  BsChevronRight,
  BsChevronLeft,
} from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { tableDataReducer } from "../reducers/tableDataReducer";
import { getRoundedNum } from "../utils/getRoundedNumber";
import { getColouredNum } from "../utils/getColoredNumber";
import { getCurrencyFormat } from "../utils/getCurrencyFormat";

const CoinTable = ({ data, pageIndex, setPageIndex }) => {
  //global currency prop
  const { currency } = useContext(CurrencyContext);

  //initial table data prefetched, data is displayed depending on which currency is selected
  const [tableData, dispatch] = useReducer(tableDataReducer, [], () =>
    data.map((coin) => {
      return {
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        image: coin.image,
        market_cap_rank: coin.market_cap_rank,
        circulating_supply: coin.circulating_supply,
        market_cap: coin.market_cap[currency.shorthand.toLowerCase()],
        total_volume: coin.total_volume[currency.shorthand.toLowerCase()],
        current_price: coin.current_price[currency.shorthand.toLowerCase()],
        change24h: coin.change24h[currency.shorthand.toLowerCase()],
        change7d: coin.change7d[currency.shorthand.toLowerCase()],
        sparklines: coin.sparklines,
      };
    })
  );

  //sort table values per column name
  const [columnToSort, setColumnToSort] = useState("");
  const [sortDirection, setSortDirection] = useState("desc");
  const invertDirection = {
    asc: "desc",
    desc: "asc",
  };

  //handle sort when user clicks on a column
  const handleSort = (columnName) => {
    setColumnToSort(columnName);
    setSortDirection(
      columnToSort === columnName ? invertDirection[sortDirection] : "asc"
    );
  };

  //whenever currency changes, update table data.
  //whenever data updates (useSWR revalidation), update table data
  useEffect(() => {
    dispatch({
      type: currency.shorthand.toLowerCase(),
      payload: data,
    });
  }, [currency, data]);

  return (
    <>
      <Box
        overflow="scroll"
        sx={{
          "&::-webkit-scrollbar": {
            display: "none",
            width: 0,
          },
          scrollbarWidth: "none",
        }}
      >
        <Table mb={4} bg={useColorModeValue("white", "gray.900")}>
          <Thead whiteSpace="nowrap">
            <Tr>
              <Th display={["none", null, null, "table-cell"]}>
                <Text>#</Text>
              </Th>

              <Th
                cursor="pointer"
                onClick={() => handleSort("name")}
                pos="sticky"
                left="0"
                ps={0}
                pe={[2, null, 6]}
              >
                <Text
                  bg={useColorModeValue("white", "gray.900")}
                  w="165px"
                  ps={4}
                >
                  Name
                  <Text ms={1} as="span">
                    {columnToSort === "name" ? (
                      sortDirection === "asc" ? (
                        <Icon h={2} w={2} as={AiFillCaretUp} />
                      ) : (
                        <Icon h={2} w={2} as={AiFillCaretDown} />
                      )
                    ) : null}
                  </Text>
                </Text>
              </Th>

              <Th
                cursor="pointer"
                onClick={() => handleSort("current_price")}
                isNumeric
                ps={0}
                pe={2}
              >
                <Text>
                  Price
                  <Text ms={1} as="span">
                    {columnToSort === "current_price" ? (
                      sortDirection === "asc" ? (
                        <Icon h={2} w={2} as={AiFillCaretUp} />
                      ) : (
                        <Icon h={2} w={2} as={AiFillCaretDown} />
                      )
                    ) : null}
                  </Text>
                </Text>
              </Th>
              <Th
                cursor="pointer"
                onClick={() => handleSort("change24h")}
                isNumeric
                ps={0}
                pe={2}
              >
                <Text>
                  24h %
                  <Text ms={1} as="span">
                    {columnToSort === "change24h" ? (
                      sortDirection === "asc" ? (
                        <Icon h={2} w={2} as={AiFillCaretUp} />
                      ) : (
                        <Icon h={2} w={2} as={AiFillCaretDown} />
                      )
                    ) : null}
                  </Text>
                </Text>
              </Th>

              <Th
                cursor="pointer"
                onClick={() => handleSort("change7d")}
                isNumeric
                ps={0}
                pe={2}
              >
                <Text>
                  7d %
                  <Text ms={1} as="span">
                    {columnToSort === "change7d" ? (
                      sortDirection === "asc" ? (
                        <Icon h={2} w={2} as={AiFillCaretUp} />
                      ) : (
                        <Icon h={2} w={2} as={AiFillCaretDown} />
                      )
                    ) : null}
                  </Text>
                </Text>
              </Th>

              <Th
                cursor="pointer"
                onClick={() => handleSort("market_cap")}
                isNumeric
                ps={0}
                pe={2}
              >
                <Text>
                  Market Cap
                  <Text ms={1} as="span">
                    {columnToSort === "market_cap" ? (
                      sortDirection === "asc" ? (
                        <Icon h={2} w={2} as={AiFillCaretUp} />
                      ) : (
                        <Icon h={2} w={2} as={AiFillCaretDown} />
                      )
                    ) : null}
                  </Text>
                </Text>
              </Th>
              <Th
                cursor="pointer"
                onClick={() => handleSort("total_volume")}
                isNumeric
                ps={0}
                pe={2}
              >
                <Text>
                  Volume (24h)
                  <Text ms={1} as="span">
                    {columnToSort === "total_volume" ? (
                      sortDirection === "asc" ? (
                        <Icon h={2} w={2} as={AiFillCaretUp} />
                      ) : (
                        <Icon h={2} w={2} as={AiFillCaretDown} />
                      )
                    ) : null}
                  </Text>
                </Text>
              </Th>

              <Th
                cursor="pointer"
                onClick={() => handleSort("circulating_supply")}
                isNumeric
                ps={0}
                pe={2}
              >
                <Text>
                  Circulating Supply
                  <Text ms={1} as="span">
                    {columnToSort === "circulating_supply" ? (
                      sortDirection === "asc" ? (
                        <Icon h={2} w={2} as={AiFillCaretUp} />
                      ) : (
                        <Icon h={2} w={2} as={AiFillCaretDown} />
                      )
                    ) : null}
                  </Text>
                </Text>
              </Th>

              <Th>
                <Text>Last 7 Days</Text>
              </Th>

              <Th pe={0} ps={0}></Th>
            </Tr>
          </Thead>

          <Tbody>
            {_.orderBy(tableData, columnToSort, sortDirection).map(
              (coin, i) => (
                <Tr
                  role="group"
                  _hover={{
                    bg: useColorModeValue("gray.100", "gray.800"),
                    transition: "ease-in 0.15s",
                  }}
                  fontWeight={600}
                  key={i}
                >
                  <Td display={["none", null, null, "table-cell"]}>
                    <Text>{coin.market_cap_rank}</Text>
                  </Td>

                  <Td
                    cursor="pointer"
                    pos="sticky"
                    left="0"
                    ps={0}
                    pe={[2, null, 6]}
                    py={2.5}
                  >
                    <Link href={`cryptocurrencies/${coin.id}`}>
                      <HStack
                        w="165px"
                        ps={4}
                        // pe={8}
                        spacing={4}
                        _groupHover={{
                          bg: useColorModeValue("gray.100", "gray.800"),
                          transition: "ease-in 0.15s",
                        }}
                        bg={useColorModeValue("white", "gray.900")}
                      >
                        <Image
                          objectFit="contain"
                          w="26px"
                          borderRadius="20%"
                          src={coin.image}
                          alt=""
                        />
                        <Stack fontWeight={600} spacing={1}>
                          <Text>{coin.name}</Text>
                          <Text
                            display={["none", null, null, "initial"]}
                            fontSize="xs"
                            color={useColorModeValue("gray.500", "gray.200")}
                          >
                            {coin.symbol.toUpperCase()}
                          </Text>
                          <HStack display={["flex", null, null, "none"]}>
                            <Text
                              px={1.5}
                              borderRadius="md"
                              bg={useColorModeValue("gray.100", "gray.700")}
                            >
                              {coin.market_cap_rank}
                            </Text>
                            <Text
                              fontSize="xs"
                              color={useColorModeValue("gray.500", "gray.200")}
                            >
                              {coin.symbol.toUpperCase()}
                            </Text>
                          </HStack>
                        </Stack>
                      </HStack>
                    </Link>
                  </Td>

                  <Link href={`cryptocurrencies/${coin.id}`}>
                    <Td whiteSpace="nowrap" isNumeric pr={2}>
                      <Text>
                        {getCurrencyFormat(currency, coin.current_price)}
                      </Text>
                    </Td>
                  </Link>

                  <Td isNumeric px={2}>
                    <Text>{getColouredNum(coin.change24h)}</Text>
                  </Td>

                  <Td isNumeric px={2}>
                    <Text>{getColouredNum(coin.change7d)}</Text>
                  </Td>

                  <Link href={`cryptocurrencies/${coin.id}`}>
                    <Td whiteSpace="nowrap" isNumeric px={2}>
                      {currency.type === "FIAT" ? (
                        <>
                          <Text display={[null, null, null, "none"]}>
                            {`${currency.symbol}${getRoundedNum(
                              coin.market_cap
                            )}`}
                          </Text>
                          <Text display={["none", null, null, "initial"]}>
                            {`${
                              currency.symbol
                            }${coin.market_cap.toLocaleString(undefined, {
                              maximumFractionDigits: 2,
                            })}`}
                          </Text>
                        </>
                      ) : (
                        <Text>
                          {`${coin.market_cap.toLocaleString(undefined, {
                            minimumFractionDigits: 0,
                          })} ${currency.symbol}`}
                        </Text>
                      )}
                    </Td>
                  </Link>
                  <Link href={`cryptocurrencies/${coin.id}`}>
                    <Td whiteSpace="nowrap" isNumeric px={2}>
                      {currency.type === "FIAT" ? (
                        <>
                          <Text display={[null, null, null, "none"]}>
                            {`${currency.symbol}${getRoundedNum(
                              coin.total_volume
                            )}`}
                          </Text>
                          <Text display={["none", null, null, "initial"]}>
                            {`${
                              currency.symbol
                            }${coin.total_volume.toLocaleString(undefined, {
                              maximumFractionDigits: 2,
                            })}`}
                          </Text>
                        </>
                      ) : (
                        <Text>
                          {`${coin.total_volume.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                          })} ${currency.symbol}`}
                        </Text>
                      )}
                    </Td>
                  </Link>

                  <Link href={`cryptocurrencies/${coin.id}`}>
                    <Td isNumeric px={2}>
                      <Text whiteSpace="nowrap">
                        {`${coin.circulating_supply.toLocaleString(undefined, {
                          maximumFractionDigits: 0,
                        })} ${coin.symbol.toUpperCase()}`}
                      </Text>
                    </Td>
                  </Link>

                  <Link href={`/cryptocurrencies/${coin.id}`}>
                    <Td
                      w="120px"
                      overflow="hidden"
                      whiteSpace="nowrap"
                      ps={4}
                      pe={2}
                    >
                      <Sparklines data={coin.sparklines} svgHeight={35}>
                        {coin.change7d[currency.shorthand.toLowerCase()] < 0 ? (
                          <SparklinesLine
                            style={{
                              strokeWidth: "2.5",
                              stroke: "#d44c46",
                              fill: "none",
                            }}
                          />
                        ) : (
                          <SparklinesLine
                            style={{
                              strokeWidth: "2.5",
                              stroke: "#3CB371",
                              fill: "none",
                            }}
                          />
                        )}
                      </Sparklines>
                    </Td>
                  </Link>
                  <Td cursor="pointer" px={2}>
                    <Popover strategy="fixed">
                      <PopoverTrigger>
                        <IconButton
                          bg="none"
                          size="sm"
                          borderRadius="full"
                          icon={<BsThreeDotsVertical />}
                        />
                      </PopoverTrigger>
                      <PopoverContent me={2} w="auto">
                        <PopoverArrow ms={1} />
                        <PopoverBody>
                          <Link href={`cryptocurrencies/${coin.id}`}>
                            <Text
                              cursor="pointer"
                              fontSize="small"
                              fontWeight={600}
                            >
                              {`View Charts `}
                              <Text as="span">
                                <Icon
                                  mb={1}
                                  mx={1}
                                  h={3.5}
                                  w={3.5}
                                  as={FiExternalLink}
                                />
                              </Text>
                            </Text>
                          </Link>
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </Td>
                </Tr>
              )
            )}
          </Tbody>
        </Table>
      </Box>

      {/* Pagination */}
      <HStack spacing={8} mt={2} mb={4} justify="center">
        <IconButton
          disabled={pageIndex === 1 ? true : false}
          size="sm"
          onClick={() => {
            setPageIndex(pageIndex - 1);
            window.scroll({
              top: 0,
              behavior: "smooth",
            });
          }}
          icon={<BsChevronLeft />}
        />

        <IconButton
          size="sm"
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
  );
};

export default CoinTable;
