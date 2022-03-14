import {
  useColorModeValue,
  HStack,
  Text,
  Icon,
  Button,
  Flex,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Slider as ChakraSlider,
  SliderTrack,
  SliderFilledTrack,
} from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

import { useContext, useState } from "react";
import { CurrencyContext } from "../contexts/CurrencyContext";
import { getCurrencyFormat } from "../utils/getCurrencyFormat";

const Slider = ({ coin }) => {
  const { currency } = useContext(CurrencyContext);
  const [menuCaption, setMenuCaption] = useState("24h");
  const handleSelect = (e) => {
    setMenuCaption(e.target.value);
  };

  return coin.market_data.atl_24h[currency.shorthand.toLowerCase()] |
    coin.market_data.ath_24h[currency.shorthand.toLowerCase()] ? (
    <Flex
      my={1}
      flexDir="column"
      align={[null, null, "flex-end", null, "flex-start"]}
    >
      <HStack minW="100%" justify="space-between">
        <Text fontWeight={500} fontSize="xs">
          {`LOW `}
          <Text fontWeight={600} as="span">
            {getCurrencyFormat(
              currency,
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
            )}
          </Text>
        </Text>

        <Text fontWeight={500} fontSize="xs">
          {`HIGH `}
          <Text fontWeight={600} as="span">
            {getCurrencyFormat(
              currency,
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
            )}
          </Text>
        </Text>

        <Menu autoSelect={false}>
          <MenuButton size="xs" fontSize="xs" as={Button}>
            <HStack pr={(2, null, 1)}>
              <Text fontSize="xs">{menuCaption}</Text>
              <Icon h={2} w={2} as={BsChevronDown} />
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
        mt={6}
        size="lg"
        cursor="default"
        value={coin.market_data.current_price[currency.shorthand.toLowerCase()]}
        // defaultValue={
        //   coin.market_data.current_price[currency.shorthand.toLowerCase()]
        // }
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
        // isReadOnly={true}
      >
        <SliderTrack borderRadius="lg" h="5px">
          <SliderFilledTrack bg="blue.500" transition="1.25s ease-in-out" />
        </SliderTrack>
      </ChakraSlider>
    </Flex>
  ) : null;
};

export default Slider;
