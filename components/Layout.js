import Navbar from "./Navbar";
import { Flex, Stack, useColorModeValue } from "@chakra-ui/react";

const Layout = ({ children }) => {
  return (
    <Flex
      flexDir="column"
      bgGradient={useColorModeValue(
        "",
        "linear(to-b, gray.800, gray.900, gray.900)"
      )}
    >
      <Navbar />
      <Stack
        as="main"
        spacing={4}
        px={[4, null, null, 8]}
        py={[4, null, null, 6]}
        // maxW="1440px"
        // mx="auto"
      >
        {children}
      </Stack>
    </Flex>
  );
};

export default Layout;
