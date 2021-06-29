import {
  Menu,
  MenuButton,
  HStack,
  Text,
  Icon,
  MenuList,
  MenuItem,
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

const Slider = ({ handleSelect, menuCaption, coinStats }) => {
  const MotionBox = motion(Box);
  return (
    <MotionBox w={[null, null, null, "45vw"]} px={1}>
      <Flex align="center" justify="space-between">
        <Text fontSize="xs">
          <strong>LOW</strong> £
          {menuCaption === "24h"
            ? coinStats.market_data.low_24h.gbp
            : coinStats.market_data.atl.gbp}
        </Text>

        <Text fontSize="xs">
          <strong>HIGH</strong> £
          {menuCaption === "24h"
            ? coinStats.market_data.high_24h.gbp
            : coinStats.market_data.ath.gbp}
        </Text>

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
      </Flex>
      <ChakraSlider
        my={2}
        size="lg"
        cursor="default"
        defaultValue={coinStats.market_data.current_price.gbp.toPrecision()}
        min={
          menuCaption === "24h"
            ? coinStats.market_data.low_24h.gbp
            : coinStats.market_data.atl.gbp
        }
        max={
          menuCaption === "24h"
            ? coinStats.market_data.high_24h.gbp
            : coinStats.market_data.ath.gbp
        }
        isReadOnly={true}
      >
        <SliderTrack borderRadius="md" h="4px">
          <SliderFilledTrack color="#3182CE" transition="2s ease-in-out" />
        </SliderTrack>
      </ChakraSlider>
    </MotionBox>
  );
};

export default Slider;
