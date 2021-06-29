import { useContext, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Flex,
  Box,
  Spacer,
  Text,
  Select,
  Button,
  Divider,
  IconButton,
  Icon,
  Input,
  InputGroup,
  InputRightAddon,
  InputLeftElement,
  useColorMode,
  useColorModeValue,
  HStack,
  Stack,
  Center,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerCloseButton,
  DrawerOverlay,
  DrawerContent,
  DrawerFooter,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { AiFillCaretDown } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { GiHamburgerMenu, GiTwoCoins } from "react-icons/gi";
import { FaCoins, FaMoon, FaSun, FaHome, FaExchangeAlt } from "react-icons/fa";
import { HiOutlineMenuAlt3, HiOutlineCurrencyYen } from "react-icons/hi";
import { BsChevronDown, BsChevronRight } from "react-icons/bs";

import coinService from "../services/coin";

export const getStaticProps = async () => {
  const coinData = await coinService.getGlobal();

  return {
    props: { coinData },
    revalidate: 10,
  };
};

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

const currencies = [
  { code: "gbp", text: "GBP" },
  { code: "usd", text: "USD" },
  { code: "eur", text: "EUR" },
];

const Navbar = ({ coinData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const [indicatorStatus, setIndicatorStatus] = useState({
    left: 0,
    width: 0,
  });

  const { toggleColorMode } = useColorMode();
  const { pathname } = useRouter();

  const getIndicatorPath = () => {
    let pathId = navItems
      .filter((item) => pathname === item.url)
      .map((item) => item.id);

    // When on dynamic route, pathname now contains /[pathId/[dynamic route]... therefore must split router pathname
    if (pathId.length < 1) {
      console.log(
        "pathId is null... \nsplitting URL and recalculating pathId..."
      );
      const paths = pathname.split("/");
      pathId = navItems
        .filter((item) => paths[1] === item.id.toLowerCase())
        .map((item) => item.id);

      console.log(`new pathId: ${pathId}`);
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

  useEffect(() => {
    getIndicatorPath();
    console.log(`path: ${pathname}`);
  }, [pathname]);

  const handleHover = (e) => {
    const container = document.getElementById(e.currentTarget.id);

    setIndicatorStatus({
      ...indicatorStatus,
      left: `${container.offsetLeft}px`,
      width: `${container.offsetWidth}px`,
    });
    console.log("changed indicator", e.currentTarget.id);
  };

  const handleCurrencyChange = (e) => {
    console.log(`currency has been changed ${e.target.value}`);
  };

  const Motion__iconButton = motion(Flex);
  return (
    <>
      {/* CONTAINER */}
      <Flex
        pos="sticky"
        top="0"
        px={[4, null, 8, 10]}
        py={[3, null, null, 0]}
        bg={useColorModeValue("white", "gray.900")}
        align="center"
        justify="flex-end"
      >
        {/* NAV ITEMS */}
        {/* DESKTOP NAVBAR */}
        <HStack
          display={["none", null, null, "flex"]}
          spacing={[null, null, null, 16]}
        >
          {navItems.map((item) => (
            // <Flex
            // h={["0px", "0px", "50px", "75px"]}
            //   // borderBottom="solid 3.5px transparent"
            //   // _hover={{
            //   // borderBottom: useColorModeValue(
            //   //   "solid 3.5px #3182CE",
            //   //   "solid 3.5px #63B3ED"
            //   // ),
            //   //   transition: ".2s ease-in",
            //   // }}
            // >
            <Link key={item.id} href={`${item.url}`}>
              <Flex
                id={item.id}
                onMouseOver={handleHover}
                onMouseLeave={getIndicatorPath}
                userSelect="none"
                cursor="pointer"
                h={["0px", "0px", "50px"]}
                display={["none", null, null, "flex"]}
                fontSize="sm"
                align="center"
              >
                <Text pr="0.75rem">{item.id}</Text>

                <Icon as={item.icon} />
              </Flex>
            </Link>
            // </Flex>
          ))}
        </HStack>

        <Spacer />
        <HStack display={["none", null, null, "flex"]} spacing={8}>
          {/* SEARCH BOX */}
          <InputGroup display={["flex"]}>
            <InputLeftElement
              children={<FaCoins />}
              opacity={useColorModeValue("25%", "45%")}
            />
            <Input
              borderRadius="md"
              fontSize={["xs", null, "sm"]}
              placeholder="Search crypto..."
              w={["10rem", "12rem"]}
              zIndex="2"
              _focus={{}}
            />
            <InputRightAddon
              borderRadius="md"
              borderColor="inherit"
              cursor="pointer"
              bg={useColorModeValue("gray.100", "whiteAlpha.200")}
              _hover={{
                transition: "all 0.2s",
                bg: useColorModeValue("gray.200", "whiteAlpha.300"),
              }}
              _active={{
                bg: useColorModeValue("gray.300", "whiteAlpha.400"),
              }}
              children={
                <Icon
                  transition="none"
                  bg="transparent"
                  aria-label="search button"
                  as={FiSearch}
                  _hover={{
                    bg: "transparent",
                  }}
                  cursor="pointer"
                  _focus={{
                    outline: "none",
                  }}
                  _active={{
                    bg: "transparent",
                  }}
                />
              }
            />
          </InputGroup>
          {/* CURRENCY SELECTOR */}
          <Select
            transition="none"
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            onChange={handleCurrencyChange}
            fontSize="sm"
            variant="filled"
            cursor="pointer"
            bg={useColorModeValue("gray.100", "whiteAlpha.200")}
            _hover={{
              transition: "all 0.2s",
              bg: useColorModeValue("gray.200", "whiteAlpha.300"),
            }}
            _focus={{
              outline: "none",
            }}
          >
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.text}
              </option>
            ))}
          </Select>
          {/* Dark Mode Switch */}
          <IconButton
            transition="all 0.2s"
            color={useColorModeValue("gray.600", "gray.200")}
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            aria-label="Dark Mode Switch"
            onClick={toggleColorMode}
          >
            <Motion__iconButton
              align="center"
              justify="center"
              w="100%"
              h="100%"
              whileHover={useColorModeValue({ rotate: -30 }, { rotate: 30 })}
              transition={{ duration: 0.35 }}
            >
              {useColorModeValue(<FaMoon />, <FaSun />)}
            </Motion__iconButton>
          </IconButton>
        </HStack>
        <HStack>
          <Button
            px={0}
            cursor="pointer"
            bg="none"
            display={["flex", null, null, "none"]}
          >
            <Center>
              <Icon h="22px" w="22px" as={FiSearch} />
            </Center>
          </Button>
          <Button
            ref={btnRef}
            onClick={onOpen}
            px={0}
            cursor="pointer"
            bg="none"
            display={["flex", null, null, "none"]}
          >
            <Center>
              <Icon h="24px" w="24px" as={HiOutlineMenuAlt3} />
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
                  <Motion__iconButton
                    align="center"
                    justify="center"
                    w="100%"
                    h="100%"
                    whileHover={useColorModeValue(
                      { rotate: -30 },
                      { rotate: 30 }
                    )}
                    transition={{ duration: 0.35 }}
                  >
                    {useColorModeValue(<FaMoon />, <FaSun />)}
                  </Motion__iconButton>
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

        {/* BORDER BOTTOM */}
        <Box
          display={["none", null, null, "flex"]}
          zIndex="9"
          transition="ease-in-out 0.5s"
          pos="absolute"
          left={indicatorStatus.left}
          top="4.3rem"
          h="0.15rem"
          w={indicatorStatus.width}
          // bg={useColorModeValue("#3182CE", "#63B3ED")}
          bg="#29d"
          borderRadius="md"
        />
      </Flex>
    </>
  );
};

export default Navbar;
