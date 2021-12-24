import { Button, Text } from "@chakra-ui/react";

import { BsChevronRight } from "react-icons/bs";

const LinkButton = ({ handleClick, children }) => {
  return (
    <Button
      onClick={handleClick}
      ps={1}
      pe={2}
      userSelect="none"
      bg="none"
      _hover={{ bg: "none" }}
      _active={{ bg: "none" }}
      justifyContent="space-between"
      fontSize="sm"
      fontWeight={600}
    >
      {children}
      <BsChevronRight />
    </Button>
  );
};

export default LinkButton;
