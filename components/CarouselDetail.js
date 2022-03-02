import {
  useColorModeValue,
  Text,
  Image,
  Spacer,
  Stack,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
const MotionHStack = motion(HStack);
import Link from "next/link";

const CarouselDetail = ({ coinData }) => {
  return (
    <Link href={`/cryptocurrencies/${coinData.id}`}>
      <MotionHStack
        h={20}
        whileTap={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 130 }}
        pos="relative"
        as="a"
        minW="275px"
        p={2}
        // px={4}
        me={2}
        userSelect="none"
        bg={useColorModeValue("white", "gray.900")}
        borderRadius="md"
        shadow="sm"
        cursor="pointer"
        spacing={2}
      >
        <Image
          mx={2.5}
          ignoreFallback
          userSelect="none"
          objectFit="contain"
          w="32px"
          borderRadius="20%"
          src={coinData.large}
          alt=""
        />
        <Text isTruncated fontSize="sm" fontWeight={600}>
          {coinData.name}
        </Text>
      </MotionHStack>
    </Link>
  );
};

export default CarouselDetail;
