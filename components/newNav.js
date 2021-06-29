import { useState, useEffect, useRef } from "react";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Center,
  Icon,
  useDisclosure,
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
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { FaHome, FaMoon, FaSun } from "react-icons/fa";
import { AiFillCaretDown } from "react-icons/ai";
import { GiTwoCoins } from "react-icons/gi";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { BsChevronRight } from "react-icons/bs";
import Link from "next/link";
import coinService from "../services/coin";

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
];

const Navbar = () => {
  const [coinData, setCoinData] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { toggleColorMode } = useColorMode();

  const btnRef = useRef();

  // useEffect(async () => {
  //   const res = await (
  //     await fetch("https://api.coingecko.com/api/v3/global")
  //   ).json();
  //   const data = res.data;
  //   setCoinData(data);
  // }, []);

  useEffect(async () => {
    const data = await coinService.getGlobal();
    setCoinData(data);
  }, []);

  console.log(coinData);
  return (
    <>
      <Flex
        zIndex="999"
        bg={useColorModeValue("white", "gray.900")}
        borderBottom="1px solid"
        borderColor="inherit"
        pos="sticky"
        top="0"
        justify="flex-end"
        align="center"
        px={4}
        py={2}
      >
        <HStack spacing={1.5}>
          {/* <IconButton size="lg" bg="transparent" icon={<FiSearch />} /> */}
          <Button px={0} bg="none" display={["flex", null, null, "none"]}>
            <Center>
              <Icon h="20px" w="20px" as={FiSearch} />
            </Center>
          </Button>
          {/* <IconButton size="lg" bg="transparent" icon={<HiOutlineMenuAlt3 />} /> */}
          <Button
            ref={btnRef}
            onClick={onOpen}
            px={0}
            bg="none"
            display={["flex", null, null, "none"]}
          >
            <Center>
              <Icon h="20px" w="20px" as={HiOutlineMenuAlt3} />
            </Center>
          </Button>
        </HStack>
        <Drawer
          isOpen={isOpen}
          onClose={onClose}
          finalFocusRef={btnRef}
          placement="right"
        >
          <DrawerOverlay bg="blackAlpha.800" />
          <DrawerContent bg="gray.300">
            <DrawerHeader
              bg={useColorModeValue("white", "gray.900")}
              px={4}
              py={4}
            >
              <HStack spacing={4} ml={2}>
                <IconButton
                  bg="none"
                  aria-label="Dark Mode Switch"
                  onClick={toggleColorMode}
                >
                  {useColorModeValue(<FaMoon />, <FaSun />)}
                </IconButton>
                <Menu autoSelect={false}>
                  <MenuButton bg="none">
                    <HStack spacing={2}>
                      <Text fontWeight={600} fontSize="md">
                        GBP
                      </Text>
                      <Icon h="12px" w="12px" as={AiFillCaretDown} />
                    </HStack>
                  </MenuButton>
                  <MenuList
                    bg={useColorModeValue("white", "gray.900")}
                    fontSize="sm"
                    minW="10em"
                  >
                    <MenuItem>Pound Sterling</MenuItem>
                    <MenuItem>US Dollar </MenuItem>
                    <MenuItem>Euro</MenuItem>
                  </MenuList>
                </Menu>
                <Spacer />
                <DrawerCloseButton pos="inherit" w="40px" h="40px" />
              </HStack>
            </DrawerHeader>

            <DrawerBody bg={useColorModeValue("gray.50", "gray.800")}>
              {navItems.map((item) => (
                <>
                  <Link key={item.id} href={item.url}>
                    <HStack onClick={onClose} cursor="pointer" pl={2} py={4}>
                      <Text fontWeight={500} fontSize="sm">
                        {item.id}
                      </Text>
                      <Spacer />
                      <Icon h="12px" w="12px" as={BsChevronRight} />
                    </HStack>
                  </Link>
                  <Divider pl={6} />
                </>
              ))}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
      {coinData ? (
        // <Flex

        //   overflowX="auto"
        //   overflowY="hidden"
        //   whiteSpace="nowrap"
        //   userSelect="none"
        //   bg={useColorModeValue("white", "gray.900")}

        //   justify="flex-start"
        //   align="center"
        // >
        <HStack
          bg={useColorModeValue("white", "gray.900")}
          borderBottom="1px solid"
          borderColor="inherit"
          sx={{ scrollbarWidth: "none" }}
          userSelect="none"
          overflowX="auto"
          overflowY="hidden"
          whiteSpace="nowrap"
          px={4}
          py={2.5}
          fontWeight={500}
          spacing={4}
          fontSize="11px"
        >
          {coinData.active_cryptos ? (
            <HStack spacing={1}>
              <Text>Cryptos:</Text>
              <Text color={useColorModeValue("blue.500", "white")}>
                {coinData.active_cryptos}
              </Text>
            </HStack>
          ) : null}
          {coinData.total_marketcap ? (
            <HStack spacing={1}>
              <Text>Market Cap:</Text>
              <Text color={useColorModeValue("blue.500", "white")}>
                £
                {coinData.total_marketcap.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </Text>
            </HStack>
          ) : null}
          {coinData.total_volume ? (
            <HStack spacing={1}>
              <Text>24h Volume:</Text>
              <Text color={useColorModeValue("blue.500", "white")}>
                £
                {coinData.total_volume.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </Text>
            </HStack>
          ) : null}
          {coinData.dominance ? (
            <HStack spacing={1}>
              <Text>Dominance:</Text>
              <Text color={useColorModeValue("blue.500", "white")}>
                {`BTC ${coinData.dominance.btc.toFixed(2)}`}%
              </Text>
            </HStack>
          ) : null}
        </HStack>
      ) : // </Flex>
      null}
    </>
  );
};

export default Navbar;
