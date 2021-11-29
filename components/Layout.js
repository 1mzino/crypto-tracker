import Navbar from "./Navbar";
import { Box, useColorModeValue } from "@chakra-ui/react";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Box
        bg={useColorModeValue("gray.50", "gray.900")}
        bgGradient={useColorModeValue(
          "",
          "linear(to-b, gray.800, gray.900, gray.900)"
        )}
        px={[4, null, null, 6]}
        py={[4, null, null, 6]}
      >
        {children}
      </Box>
    </>
  );
};

export default Layout;
