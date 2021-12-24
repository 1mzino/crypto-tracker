import { useColorModeValue, Box, Flex, Container } from "@chakra-ui/react";

import Navbar from "../components/Navbar";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <Box minH="100vh" minW="100vw">
      <Box zIndex={2} bg={useColorModeValue("white", "gray.900")}>
        <Container
          // Display set to flex, so that flexOrder can be used on children
          display="flex"
          flexDir="column"
          maxW="container.xl"
          px={[4, null, 8]}
        >
          <Navbar />
          <Header />
        </Container>
      </Box>

      <Box
        flex={1}
        zIndex={1}
        bgGradient={useColorModeValue(
          "",
          "linear(to-b, gray.800, gray.900, gray.900)"
        )}
      >
        <Container maxW="container.xl" px={[4, null, 8]} py={4}>
          {children}
        </Container>
      </Box>

      {/* <Box>
        <Container mawW="container.xl" my={4}>
          <Footer />
        </Container>
      </Box> */}
    </Box>
  );
};

export default Layout;
