import {
  useColorModeValue,
  Text,
  Image,
  Stack,
  HStack,
} from "@chakra-ui/react";

import Link from "next/link";

const CarouselDetail = ({ coinData }) => {
  return (
    <Link
      prefetch={false}
      href={`cryptocurrencies/[id]`}
      as={`cryptocurrencies/${coinData.id}`}
    >
      <HStack
        minW="275px"
        p={6}
        me={2}
        userSelect="none"
        bg={useColorModeValue("white", "gray.900")}
        borderRadius="md"
        boxShadow="sm"
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
      </HStack>
    </Link>
  );
};

export default CarouselDetail;
