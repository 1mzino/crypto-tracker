import { Text, Icon } from "@chakra-ui/react";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";

export const getColouredNum = (num) => {
  if (num < 0) {
    return (
      <Text whiteSpace="nowrap" as="span" color="red.500" fontWeight={600}>
        <Icon h={2} as={BsFillCaretDownFill} />
        {`${Math.abs(num).toFixed(2)}%`}
      </Text>
    );
  }
  return (
    <Text whiteSpace="nowrap" as="span" color="green.500" fontWeight={600}>
      <Icon h={2} as={BsFillCaretUpFill} />
      {`${num.toFixed(2)}%`}
    </Text>
  );
};
