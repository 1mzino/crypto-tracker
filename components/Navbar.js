import {
  useDisclosure,
  useMediaQuery,
  useColorModeValue,
  useColorMode,
  Box,
  Flex,
  HStack,
  IconButton,
  Center,
  Icon,
  Stack,
  Spacer,
  Divider,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerCloseButton,
} from "@chakra-ui/react";

import useSWR from "swr";

import { useState, useEffect, useRef, useContext } from "react";
import router, { useRouter } from "next/router";

import Link from "next/link";
import { motion, LayoutGroup } from "framer-motion";

import { CurrencyContext } from "../contexts/CurrencyContext";
import CurrencySelector from "./CurrencySelector";

import { BiSearch } from "react-icons/bi";
import { FaExchangeAlt, FaMoon, FaSun } from "react-icons/fa";
import { GiTwoCoins } from "react-icons/gi";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { BsChevronRight } from "react-icons/bs";
import SearchBar from "./SearchBar";

const MotionBox = motion(Box);
const NavItem = ({
  url,
  text,
  icon,
  selected,
  handleAnimation,
  handleLeave,
}) => {
  return (
    <Link href={url}>
      <MotionBox
        as="a"
        pos="relative"
        cursor="pointer"
        onClick={handleAnimation}
        onMouseEnter={handleAnimation}
        onMouseLeave={handleLeave}
        fontSize="sm"
        py={7}
      >
        <HStack minH="100%">
          <Text fontWeight={550} pr="0.75rem">
            {text}
          </Text>

          <Icon as={icon} />
        </HStack>

        {selected && (
          <MotionBox
            layoutId="underline"
            zIndex={10}
            pos="absolute"
            top="98%"
            left="0"
            width="100%"
            height="3px"
            borderRadius="lg"
            bg="blue.400"
          />
        )}
      </MotionBox>
    </Link>
  );
};

const Navbar = () => {
  const navItems = [
    // {
    //   id: 0,
    //   name: "Home",
    //   icon: FaHome,
    //   url: "/",
    // },
    {
      id: 0,
      name: "Cryptocurrencies",
      icon: GiTwoCoins,
      url: "/",
    },
    {
      id: 1,
      name: "Exchanges",
      icon: FaExchangeAlt,
      url: "/exchanges",
    },
  ];

  const { currency, dispatch } = useContext(CurrencyContext);
  const router = useRouter();
  console.log(router);

  const btnRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { toggleColorMode } = useColorMode();
  const [selected, setSelected] = useState(0);
  const getPath = () => {
    let currentPath = navItems
      .filter((item) => router.pathname === item.url)
      .map((item) => item.id);

    if (currentPath) {
      setSelected(currentPath[0]);
    }

    if (currentPath.length < 1) {
      let newPath = navItems
        .filter(
          (item) => router.pathname.split("/")[1] === item.name.toLowerCase()
        )
        .map((item) => item.id);
      setSelected(newPath[0]);
    }

    console.log("current page", currentPath);
  };

  // const [indicatorStatus, setIndicatorStatus] = useState({
  //   left: 0,
  //   width: 0,
  // });

  // const getIndicatorPath = () => {
  //   let pathId = navItems
  //     .filter((item) => pathname === item.url)
  //     .map((item) => item.id);

  //   // When on dynamic route, pathname now contains /[pathId/[dynamic route]... therefore must split router pathname
  //   if (pathId.length < 1) {
  //     // console.log(
  //     //   "pathId is null... \nsplitting URL and recalculating pathId..."
  //     // );
  //     const paths = pathname.split("/");
  //     pathId = navItems
  //       .filter((item) => paths[1] === item.id.toLowerCase())
  //       .map((item) => item.id);

  //     // console.log(`new pathId: ${pathId}`);
  //   }

  //   const container = document.getElementById(pathId);
  //   if (container !== null) {
  //     setIndicatorStatus({
  //       ...indicatorStatus,
  //       left: `${container.offsetLeft}px`,
  //       width: `${container.offsetWidth}px`,
  //     });
  //   }
  // };

  // const handleHover = (e) => {
  //   const container = document.getElementById(e.currentTarget.id);
  //   setIndicatorStatus({
  //     ...indicatorStatus,
  //     left: `${container.offsetLeft}px`,
  //     width: `${container.offsetWidth}px`,
  //   });
  //   // console.log("changed indicator", e.currentTarget.id);
  // };

  useEffect(() => {
    getPath();
  }, [router.pathname]);

  return (
    <>
      {/* DESKTOP */}
      <Box display={["none", null, null, "block"]}>
        <HStack as="nav" w="100%" userSelect="none" align="center" spacing={16}>
          <LayoutGroup>
            {navItems.map((item) => (
              <NavItem
                url={item.url}
                key={item.id}
                text={item.name}
                icon={item.icon}
                handleAnimation={() => setSelected(item.id)}
                handleLeave={getPath}
                selected={selected === item.id}
              />
            ))}
          </LayoutGroup>

          <Spacer />
          <Flex>
            <SearchBar />
            {/* <InputGroup cursor="pointer" w="200px" variant="filled">
              <InputLeftElement color="gray.500" children={<BiSearch />} />
              <Input
                cursor="pointer"
                fontSize="xs"
                fontWeight={500}
                placeholder="Search"
                _placeholder={{
                  color: useColorModeValue("gray.600", "gray.400"),
                }}
              />
            </InputGroup> */}
            <Box as="button" onClick={toggleColorMode} ml={4} p={2} bg="none">
              <Center>
                <Icon h="14px" w="14px" as={useColorModeValue(FaMoon, FaSun)} />
              </Center>
            </Box>
            <Box>
              <CurrencySelector
                onClose={onClose}
                currency={currency}
                dispatch={dispatch}
              />
            </Box>
          </Flex>
        </HStack>

        <Divider pos="absolute" left="0" />
      </Box>

      <Box display={["block", null, null, "none"]}>
        <HStack as="nav" py={2} justify="flex-end">
          <IconButton bg="none" icon={<BiSearch />} />
          <IconButton
            ref={btnRef}
            onClick={onOpen}
            bg="none"
            icon={<HiOutlineMenuAlt3 />}
          />
        </HStack>

        <Divider pos="absolute" left="0" />

        <Drawer
          display={["block", null, null, "none"]}
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
                        {item.name}
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
      </Box>
    </>
  );
};

export default Navbar;
