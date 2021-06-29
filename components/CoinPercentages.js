import { Flex, Text, Stack } from "@chakra-ui/react";
import { BsFillCaretUpFill, BsFillCaretDownFill } from "react-icons/bs";

const CoinPercentages = ({ percentageChange, title }) => {
  if (percentageChange > 0) {
    return (
      <Stack spacing={1}>
        <Text fontSize="11px" fontWeight="500" color="gray.400">
          {title}
        </Text>
        <Flex cursor="pointer" color="green.400" align="center">
          <BsFillCaretUpFill />
          <Text isTruncated fontSize="md" fontWeight="600" ml="0.25rem">
            {percentageChange.toFixed(2)}%
          </Text>
        </Flex>
      </Stack>
    );
  } else {
    return (
      <Stack spacing={1}>
        <Text fontSize="11px" fontWeight="500" color="gray.400">
          {title}
        </Text>
        <Flex cursor="pointer" color="red.400" align="center">
          <BsFillCaretDownFill />
          <Text fontSize="md" fontWeight="600" ml="0.25rem">
            {Math.abs(percentageChange.toFixed(2))}%
          </Text>
        </Flex>
      </Stack>
    );
  }
};

export default CoinPercentages;
