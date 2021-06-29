import {
  Flex,
  Heading,
  useColorModeValue,
  Text,
  Image,
  HStack,
  Box,
  Spacer,
  Stack,
  Center,
} from "@chakra-ui/react";

import { motion } from "framer-motion";
import Link from "next/link";
import CoinPercentages from "./CoinPercentages";

const CardDetail = ({ coin }) => {
  const MotionFlex = motion(Flex);
  const MotionImage = motion(Image);
  const MotionBox = motion(Box);

  return (
    <>
      {/* CARD BACKGROUND */}

      <Link
        key={coin.id}
        href={`cryptocurrencies/[id]`}
        as={`cryptocurrencies/${coin.id}`}
      >
        <MotionFlex
          boxShadow="sm"
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.5}
          whileTap={{
            scale: 1.02,
          }}
          whileHover={{
            y: -3,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            mass: 1.5,
          }}
          cursor="pointer"
          bg={useColorModeValue("white", "gray.900")}
          borderRadius="lg"
          p={["0.35rem", null, "0.5rem"]}
          justify={["center", null, null, "flex-start"]}
        >
          {/* COIN AVATAR & TITLE */}
          <Flex
            minW={["75%", null, "110px"]}
            userSelect="none"
            transition="ease-in-out 0.3s"
            overflow="hidden"
            flexDir="column"
            py="1rem"
            justify="center"
            borderRadius="md"
            _hover={{
              bg: useColorModeValue("gray.50", "gray.800"),
            }}
            _active={{
              transition: "ease-in-out 0.15s",
              bg: useColorModeValue("gray.100", "gray.700"),
            }}
          >
            <Center>
              <Image
                userSelect="none"
                objectFit="contain"
                w={["36px", null, null, "45px"]}
                h={["36px", null, null, "45px"]}
                borderRadius="20%"
                src={coin.image}
                alt=""
                mb="0.5rem"
              />
            </Center>

            {/* <Center>
              <Text isTruncated fontSize={["xs", "sm"]} fontWeight="600">
                {coin.name}
              </Text>
            </Center> */}
            <Center>
              <Text
                fontSize={["9px", null, "10px"]}
                fontWeight="500"
                color="gray.400"
              >
                ({coin.symbol.toUpperCase()})
              </Text>
            </Center>
          </Flex>

          {/* COIN STATS*/}
          <Stack
            userSelect="none"
            display={["none", null, null, "flex"]}
            py={4}
            px={2}
          >
            {/* PERCENTAGES  */}
            <HStack spacing={6} align="flex-start">
              <CoinPercentages title="24h %" percentageChange={coin.price24h} />
              <CoinPercentages title="7d %" percentageChange={coin.price7d} />
            </HStack>
            {/* CURRENT PRICE */}
            <Stack spacing={0}>
              <Text
                mt="0.25rem"
                fontSize="11px"
                fontWeight="500"
                color="gray.400"
              >
                Price (£)
              </Text>
              {coin.currentPrice < 1 ? (
                <Text fontSize="lg" fontWeight="600">
                  £{coin.currentPrice.toPrecision()}
                </Text>
              ) : (
                <Text fontSize="lg" fontWeight="600">
                  £{coin.currentPrice.toFixed(2)}
                </Text>
              )}
            </Stack>
          </Stack>
        </MotionFlex>
      </Link>
    </>
  );
};

export default CardDetail;
