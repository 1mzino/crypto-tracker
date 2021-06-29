import {
  Box,
  useColorModeValue,
  HStack,
  Divider,
  Heading,
  Image,
  useBreakpointValue,
  Tag,
  Stack,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  Button,
  MenuItem,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { motion } from "framer-motion";
import CoinStats from "./CoinStats";
import Slider from "./Slider";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";

// GRAB COIN ID FROM ROUTER
// FETCH COIN DETAILS
// OUTPUT

const BoxVariants = {
  hidden: {
    y: 100,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 50,
    },
  },
};

export const getStaticPaths = async () => {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/list?include_platform=false`
  );
  const data = await res.json();

  const ids = data.map((coin) => coin.id);
  const paths = ids.map((id) => ({ params: { id: id.toString() } }));
  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const coinStats = await (
    await fetch(
      `https://api.coingecko.com/api/v3/coins/${context.params.id}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=true&sparkline=false`
    )
  ).json();

  return {
    props: { coinStats },
    revalidate: 10,
  };
};

const coin = ({ coinStats }) => {
  const [menuCaption, setMenuCaption] = useState("24h");
  console.log(coinStats);

  const handleSelect = (e) => {
    setMenuCaption(e.target.value);
  };

  const MotionBox = motion(Box);
  const MotionStack = motion(Stack);
  return (
    <MotionBox
      variants={BoxVariants}
      initial="hidden"
      animate="visible"
      bg={useColorModeValue("white", "gray.900")}
      boxShadow="sm"
      borderRadius="xl"
      h="100vh"
      pt={[2, null, null, "1rem"]}
      px={[2, null, 4]}
    >
      <MotionStack direction="column">
        <Stack mb={4} spacing={2} direction={["column", null, "row"]}>
          {/* COIN LOGO, TITLE & TAGS */}
          <HStack
            spacing={4}
            w="fit-content"
            whiteSpace="nowrap"
            userSelect="none"
            borderRadius="lg"
            cursor="pointer"
            px={["0.5rem", null, null, "1rem"]}
            py={["0.5rem", null, null, "1rem"]}
            _hover={{
              bg: useColorModeValue("gray.50", "gray.800"),
              transition: "ease-in-out 0.15s",
            }}
            _active={{
              transition: "ease-in-out 0.15s",
              bg: useColorModeValue("gray.100", "gray.700"),
            }}
          >
            <Image
              userSelect="none"
              objectFit="contain"
              w={["36px", null, null, "48px"]}
              h={["36px", null, null, "48px"]}
              borderRadius="20%"
              src={coinStats.image.large}
              alt=""
            />

            <Heading fontSize="2xl">{coinStats.name}</Heading>
            <Tag
              size="xs"
              px={1}
              py={0.5}
              overflow="hidden"
              whiteSpace="nowrap"
              color={useColorModeValue("gray.500", "gray.300")}
              fontSize="10px"
              fontWeight="600"
            >
              {coinStats.symbol.toUpperCase()}
            </Tag>
          </HStack>
          <Spacer display={["none", null, "initial", "none"]} />
          <HStack>
            <Tag overflow="hidden" whiteSpace="nowrap" fontSize="xs">
              Rank #{coinStats.market_data.market_cap_rank}
            </Tag>
            {coinStats.categories.length > 0 ? (
              <Tag overflow="hidden" whiteSpace="nowrap" fontSize="xs">
                {coinStats.categories[0]}
              </Tag>
            ) : (
              <Tag fontSize="xs">Cryptocurrency</Tag>
            )}
          </HStack>
        </Stack>
        <Divider />

        <CoinStats coinStats={coinStats} />
        <Divider />
        <Slider
          handleSelect={handleSelect}
          menuCaption={menuCaption}
          coinStats={coinStats}
        />
      </MotionStack>

      {/* MOBILE ONLY SLIDER */}
    </MotionBox>
  );
};

export default coin;
