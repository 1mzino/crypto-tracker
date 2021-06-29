import {
  Button,
  Box,
  Flex,
  Divider,
  Stack,
  Icon,
  HStack,
  useColorModeValue,
  Text,
  useDisclosure,
  Heading,
} from "@chakra-ui/react";
import { useState } from "react";
import { motion } from "framer-motion";
import CardMenu from "../components/CardMenu";
import CardView from "../components/CardView";
import coinService from "../services/coin";

const getTrendingCoins = async () => {
  const coinList = await coinService.getTrending();
  const coinData = coinList.map((coin) => coinService.getCoinData(coin));
  return await Promise.all(coinData);
};

export const getStaticProps = async () => {
  const trendingCoins = await getTrendingCoins();

  return {
    props: { trendingCoins },
    revalidate: 10,
  };
};

//  FRAMER MOTION
const StackVariants = {
  hidden: {
    y: 50,
    opacity: 0,
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

const CardVariants = {
  hidden: {
    y: 50,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.33,
      type: "spring",
      stiffness: 70,
      mass: 0.6,
    },
  },
};

export default function Home({
  trendingCoins,
  topCoins,
  biggestGainers,
  biggestLosers,
}) {
  const categories = [
    {
      heading: "Trending",
      context: trendingCoins,
    },
    {
      heading: "Top Ten",
      context: topCoins,
    },
    {
      heading: "Biggest Gainers",
      context: biggestGainers,
    },
    {
      heading: "Biggest Losers",
      context: biggestLosers,
    },
  ];
  const [category, setCategory] = useState(categories[0]);

  const handleCategoryChange = (e) => {
    const items = categories;
    items.filter((category) => category.heading === e.target.value);
  };

  const MotionStack = motion(Stack);
  const MotionHStack = motion(HStack);
  const MotionBox = motion(Box);

  return (
    <>
      <Stack spacing={2}>
        <Text fontWeight={600} fontSize="md">
          Today's Cryptocurrency Prices
        </Text>
        <Text fontSize="sm">
          {`The global crypto market is at $1.38T, a 3.95% increase over the last day`}
        </Text>

        <Divider pt={2} />
        <HStack
          onClick={handleCategoryChange}
          spacing={[2, null, null, 4]}
          my={["0.25rem", null, null, "0.5rem"]}
        >
          {categories.map((category) => (
            <Button
              boxShadow="sm"
              bg={useColorModeValue("gray.100", "gray.700")}
              fontWeight={500}
              key={category.heading}
              value={category.heading}
              size="xs"
              fontSize={["11px", null, null, "xs"]}
            >
              {category.heading}
            </Button>
          ))}
        </HStack>

        <CardView
          heading={category.heading}
          coins={category.context}
          variants={CardVariants}
        />
      </Stack>
    </>
  );
}
