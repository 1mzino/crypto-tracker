import Navbar from "./newNav";
import { Box, useColorModeValue } from "@chakra-ui/react";

const Layout = ({ children }) => {
  return (
    <>
      <Box h="100vh" bg={useColorModeValue("gray.50", "gray.800")}>
        <Navbar />
        <Box px={[4, null, 6]} pt={4} transition="all 0.2s">
          {children}
        </Box>
      </Box>
    </>
  );
};

export default Layout;
