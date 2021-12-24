import { HStack, Text, useColorModeValue, Icon } from "@chakra-ui/react";

import { VscGithub } from "react-icons/vsc";

const Footer = () => {
  return (
    <HStack
      cursor="pointer"
      justify="center"
      pt={2}
      color={useColorModeValue("gray.700", "gray.600")}
    >
      <Text fontSize="x-small" fontWeight="semibold">
        Created by Imran Chowdhury
      </Text>

      <Icon h={3} w={3} as={VscGithub} />
    </HStack>
  );
};

export default Footer;
