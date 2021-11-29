import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Center,
  Icon,
  useDisclosure,
  Stack,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerCloseButton,
  useColorModeValue,
  useColorMode,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spacer,
  Divider,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
} from "@chakra-ui/react";

import { useState, useEffect, useRef, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import useGlobalData from "../hooks/useGlobalData";
import { CurrencyContext } from "../contexts/CurrencyContext";

import CurrencySelector from "./CurrencySelector";

import { FiSearch } from "react-icons/fi";
import { FaHome, FaMoon, FaSun } from "react-icons/fa";
import { AiFillCaretDown } from "react-icons/ai";
import { GiRayGun, GiTwoCoins } from "react-icons/gi";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { BsChevronRight } from "react-icons/bs";

const navItems = [
  {
    id: "Home",
    icon: FaHome,
    url: "/",
  },
  {
    id: "Cryptocurrencies",
    icon: GiTwoCoins,
    url: "/cryptocurrencies",
  },
  {
    id: "Exchanges",
    icon: GiTwoCoins,
    url: "/exchanges",
  },
];

const Navbar = () => {
  const { currency, dispatch } = useContext(CurrencyContext);
  const { marketData, isLoading } = useGlobalData();

  const { toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { pathname } = useRouter();
  const btnRef = useRef();

  const [indicatorStatus, setIndicatorStatus] = useState({
    left: 0,
    width: 0,
  });

  const getMarketChange = (data) => {
    const marketChange = data.market_cap_change.toFixed(2);

    if (marketChange > 0) {
      return `Market is up ${marketChange}%`;
    } else return `Market is down ${Math.abs(marketChange)}%`;
  };

  const getIndicatorPath = () => {
    let pathId = navItems
      .filter((item) => pathname === item.url)
      .map((item) => item.id);

    // When on dynamic route, pathname now contains /[pathId/[dynamic route]... therefore must split router pathname
    if (pathId.length < 1) {
      // console.log(
      //   "pathId is null... \nsplitting URL and recalculating pathId..."
      // );
      const paths = pathname.split("/");
      pathId = navItems
        .filter((item) => paths[1] === item.id.toLowerCase())
        .map((item) => item.id);

      // console.log(`new pathId: ${pathId}`);
    }

    const container = document.getElementById(pathId);
    if (container !== null) {
      setIndicatorStatus({
        ...indicatorStatus,
        left: `${container.offsetLeft}px`,
        width: `${container.offsetWidth}px`,
      });
    }
  };

  const handleHover = (e) => {
    const container = document.getElementById(e.currentTarget.id);
    setIndicatorStatus({
      ...indicatorStatus,
      left: `${container.offsetLeft}px`,
      width: `${container.offsetWidth}px`,
    });
    // console.log("changed indicator", e.currentTarget.id);
  };

  useEffect(() => {
    getIndicatorPath();
  }, [pathname]);

  return (
    <>
      {/* DESKTOP */}
      <Stack
        bg={useColorModeValue("white", "gray.900")}
        spacing={0}
        zIndex="9999999"
        display={["none", null, null, "flex"]}
        userSelect="none"
      >
        <HStack
          h="32px"
          borderBottom="1px solid"
          borderColor="inherit"
          px={[4, null, null, 10]}
          py={2}
          fontWeight={500}
          spacing={[4]}
          fontSize="10.5px"
        >
          {marketData ? <Text>{getMarketChange(marketData)}</Text> : null}
          <Divider orientation="vertical" />
          <Text>Cryptos: </Text>
          {isLoading ? (
            <Spinner
              mx={1.5}
              h="10px"
              w="10px"
              speed="0.75s"
              thickness="1.5px"
              color="blue.500"
            />
          ) : (
            <Text as="span" color="blue.500">
              {marketData.active_cryptos}
            </Text>
          )}

          <Text>Market Cap: </Text>
          {isLoading ? (
            <Spinner
              mx={1.5}
              h="10px"
              w="10px"
              speed="0.75s"
              thickness="1.5px"
              color="blue.500"
            />
          ) : (
            <Text as="span" color="blue.500">
              {currency.symbol}
              {marketData.market_cap[
                currency.shorthand.toLowerCase()
              ].toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </Text>
          )}

          <Text>24h Volume: </Text>
          {isLoading ? (
            <Spinner
              mx={1.5}
              h="10px"
              w="10px"
              speed="0.75s"
              thickness="1.5px"
              color="blue.500"
            />
          ) : (
            <Text as="span" color="blue.500">
              {currency.symbol}
              {marketData.volume[
                currency.shorthand.toLowerCase()
              ].toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </Text>
          )}

          <Text fontWeight={500}>{`Dominance: `}</Text>
          {isLoading ? (
            <Spinner
              mx={1.5}
              h="10px"
              w="10px"
              speed="0.75s"
              thickness="1.5px"
              color="blue.500"
            />
          ) : (
            <Text as="span" fontWeight={600} color="blue.500">
              {`${Object.keys(
                marketData.dominance
              )[0]?.toUpperCase()}: ${marketData.dominance[
                Object.keys(marketData.dominance)[0]
              ]?.toFixed(1)}%`}{" "}
              {`${Object.keys(
                marketData.dominance
              )[1]?.toUpperCase()}: ${marketData.dominance[
                Object.keys(marketData.dominance)[1]
              ]?.toFixed(1)}%`}
            </Text>
          )}
        </HStack>
        <HStack
          borderBottom="1px solid"
          borderColor="inherit"
          pos="sticky"
          top="0"
          align="center"
          px={10}
          py={4}
          spacing={[null, null, null, 16]}
        >
          {navItems.map((item) => (
            <Link key={item.id} href={`${item.url}`}>
              <Flex
                id={item.id}
                onMouseOver={handleHover}
                onMouseLeave={getIndicatorPath}
                userSelect="none"
                cursor="pointer"
                h={["0px", "0px", "40px"]}
                display={["none", null, null, "flex"]}
                fontSize="sm"
                align="center"
              >
                <Text fontWeight={550} pr="0.75rem">
                  {item.id}
                </Text>

                <Icon as={item.icon} />
              </Flex>
            </Link>
          ))}
          <Spacer />
          <HStack spacing={4}>
            <InputGroup cursor="pointer" w="200px" variant="filled">
              <InputLeftElement color="gray.500" children={<FiSearch />} />
              <Input
                cursor="pointer"
                fontSize="xs"
                fontWeight={500}
                placeholder="Search Crypto..."
                _placeholder={{
                  color: useColorModeValue("gray.600", "gray.400"),
                }}
              />
            </InputGroup>
            <Box as="button" onClick={toggleColorMode} p={2} bg="none">
              <Center>
                <Icon h="14px" w="14px" as={useColorModeValue(FaMoon, FaSun)} />
              </Center>
            </Box>
            <Box zIndex={999999}>
              <CurrencySelector
                onClose={onClose}
                currency={currency}
                dispatch={dispatch}
              />
            </Box>
          </HStack>
        </HStack>
        <Box
          transition="ease-in-out 0.5s"
          pos="absolute"
          left={indicatorStatus.left}
          top="6.4rem"
          h="0.15rem"
          w={indicatorStatus.width}
          // bg={useColorModeValue("#3182CE", "#63B3ED")}
          bg="blue.500"
          borderRadius="md"
        />
      </Stack>

      {/* MOBILE */}

      <HStack
        display={["flex", null, null, "none"]}
        bg={useColorModeValue("white", "gray.900")}
        zIndex="100"
        position="sticky"
        top="0"
        borderBottom="1px solid"
        borderColor="inherit"
        justify="flex-end"
        px={4}
        py={2}
      >
        <IconButton size="md" px={0} bg="none" icon={<FiSearch />} />
        {/* <Icon h="20px" w="20px" as={FiSearch} /> */}

        <Button ref={btnRef} onClick={onOpen} px={0} bg="none">
          <Center>
            <Icon h="20px" w="20px" as={HiOutlineMenuAlt3} />
          </Center>
        </Button>
      </HStack>
      <HStack
        sx={{
          "&::-webkit-scrollbar": {
            display: "none",
            width: 0,
          },
          scrollbarWidth: "none",
        }}
        display={["flex", null, null, "none"]}
        bg={useColorModeValue("white", "gray.900")}
        borderBottom="1px solid"
        borderColor="inherit"
        overflowX="auto"
        overflowY="hidden"
        whiteSpace="nowrap"
        h="32px"
        px={[4, null, null, 10]}
        py={2}
        spacing={2}
        fontSize="10.5px"
      >
        <Text fontWeight={500}>{`Cryptos: `}</Text>
        {isLoading ? (
          <Spinner
            mx={1.5}
            h="10px"
            w="10px"
            speed="0.75s"
            thickness="1.5px"
            color="blue.500"
          />
        ) : (
          <Text fontWeight={600} as="span" color="blue.500">
            {marketData.active_cryptos}
          </Text>
        )}

        <Text fontWeight={500}>{`Market Cap: `}</Text>
        {isLoading ? (
          <Spinner
            mx={1.5}
            h="10px"
            w="10px"
            speed="0.75s"
            thickness="1.5px"
            color="blue.500"
          />
        ) : (
          <Text fontWeight={600} as="span" color="blue.500">
            {currency.symbol}
            {marketData.market_cap[
              currency.shorthand.toLowerCase()
            ].toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}
          </Text>
        )}

        <Text as="span" fontWeight={500}>{`24h Volume: `}</Text>
        {isLoading ? (
          <Spinner
            mx={1.5}
            h="10px"
            w="10px"
            speed="0.75s"
            thickness="1.5px"
            color="blue.500"
          />
        ) : (
          <Text fontWeight={600} as="span" color="blue.500">
            {currency.symbol}
            {marketData.volume[currency.shorthand.toLowerCase()].toLocaleString(
              undefined,
              {
                maximumFractionDigits: 2,
              }
            )}
          </Text>
        )}

        <Text fontWeight={500}>{`Dominance: `}</Text>
        {isLoading ? (
          <Spinner
            mx={1.5}
            h="10px"
            w="10px"
            speed="0.75s"
            thickness="1.5px"
            color="blue.500"
          />
        ) : (
          <Text as="span" fontWeight={600} color="blue.500">
            {`${Object.keys(
              marketData.dominance
            )[0]?.toUpperCase()}: ${marketData.dominance[
              Object.keys(marketData.dominance)[0]
            ]?.toFixed(1)}%`}{" "}
            {`${Object.keys(
              marketData.dominance
            )[1]?.toUpperCase()}: ${marketData.dominance[
              Object.keys(marketData.dominance)[1]
            ]?.toFixed(1)}%`}
          </Text>
        )}
      </HStack>

      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        finalFocusRef={btnRef}
        placement="right"
      >
        <DrawerOverlay bg="blackAlpha.800" />
        <DrawerContent>
          <DrawerHeader
            bg={useColorModeValue("white", "gray.900")}
            px={4}
            py={4}
          >
            <HStack spacing={4}>
              <IconButton
                bg="none"
                aria-label="Dark Mode Switch"
                onClick={toggleColorMode}
              >
                {useColorModeValue(<FaMoon />, <FaSun />)}
              </IconButton>
              <CurrencySelector
                onClose={onClose}
                currency={currency}
                dispatch={dispatch}
              />
              <Spacer />
              <DrawerCloseButton pos="inherit" w="40px" h="40px" />
            </HStack>
          </DrawerHeader>

          <DrawerBody
            bg={useColorModeValue("gray.50", "gray.800")}
            bgGradient={useColorModeValue(
              "",
              "linear(to-b, gray.800, gray.800,  gray.900)"
            )}
          >
            {navItems.map((item) => (
              <Link key={item.id} href={item.url}>
                <Stack spacing={0}>
                  <HStack onClick={onClose} cursor="pointer" px={1} py={4}>
                    <Text fontWeight={500} fontSize="sm">
                      {item.id}
                    </Text>
                    <Spacer />
                    <Icon h="12px" w="12px" as={BsChevronRight} />
                  </HStack>
                  <Divider pl={6} />
                </Stack>
              </Link>
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navbar;
