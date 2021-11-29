import {
  Menu,
  MenuButton,
  HStack,
  Text,
  Icon,
  MenuList,
  MenuItem,
  Stack,
  Slider as ChakraSlider,
  SliderTrack,
  Button,
  SliderFilledTrack,
  useColorModeValue,
  Flex,
  Spacer,
  Box,
} from "@chakra-ui/react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { motion } from "framer-motion";
import { useState } from "react";

const Slider = ({ coin, currency }) => {
  const [menuCaption, setMenuCaption] = useState("24h");
  const handleSelect = (e) => {
    setMenuCaption(e.target.value);
  };
  const MotionBox = motion(Box);
  return (
    // <MotionBox animate w={[null, null, null, "45vw"]} px={1}>
    <Stack spacing={4}>
      <HStack>
        <Text fontSize="xs">
          {`LOW`}
          <Text as="span" fontWeight={600}>
            {` ${currency.symbol}${
              menuCaption === "24h"
                ? coin.market_data.atl_24h[
                    currency.shorthand.toLowerCase()
                  ].toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 6,
                  })
                : coin.market_data.all_time_low[
                    currency.shorthand.toLowerCase()
                  ].toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 6,
                  })
            }`}
          </Text>
        </Text>
        <Spacer />
        <Text fontSize="xs">
          {`HIGH`}
          <Text as="span" fontWeight={600}>
            {` ${currency.symbol}${
              menuCaption === "24h"
                ? coin.market_data.ath_24h[
                    currency.shorthand.toLowerCase()
                  ].toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 6,
                  })
                : coin.market_data.all_time_high[
                    currency.shorthand.toLowerCase()
                  ].toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 6,
                  })
            }`}
          </Text>
        </Text>

        <Spacer />

        <Menu autoSelect={false}>
          <MenuButton
            px={2}
            size="xs"
            fontSize="xs"
            as={Button}
            // rightIcon={<BsChevronDown  />}
          >
            <HStack pr={(2, null, 1)}>
              <Text fontSize="xs">{menuCaption}</Text>
              <Icon h="6px" w="6px" as={BsChevronDown} />
            </HStack>
          </MenuButton>
          <MenuList
            bg={useColorModeValue("white", "gray.800")}
            minW="100px"
            fontSize="sm"
          >
            <MenuItem value={"24h"} onClick={handleSelect} fontWeight="500">
              24h Low/High
            </MenuItem>
            <MenuItem value="All Time" onClick={handleSelect} fontWeight="500">
              All Time Low/High
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
      <ChakraSlider
        my={2}
        size="lg"
        cursor="default"
        defaultValue={coin.market_data.current_price.gbp.toLocaleString(
          undefined,
          {
            minimumFractionDigits: 2,
            maximumFractionDigits: 6,
          }
        )}
        min={
          menuCaption === "24h"
            ? coin.market_data.atl_24h[currency.shorthand.toLowerCase()]
            : coin.market_data.all_time_low[currency.shorthand.toLowerCase()]
        }
        max={
          menuCaption === "24h"
            ? coin.market_data.ath_24h[currency.shorthand.toLowerCase()]
            : coin.market_data.all_time_high[currency.shorthand.toLowerCase()]
        }
        isReadOnly={true}
      >
        <SliderTrack borderRadius="lg" h="5px">
          <SliderFilledTrack bg="blue.500" transition="1.25s ease-in-out" />
        </SliderTrack>
      </ChakraSlider>
    </Stack>
    // </MotionBox>
  );
};

export default Slider;
