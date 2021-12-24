import { baseStyle, extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

const Button = {
  baseStyle: {
    _focus: {
      boxShadow: "none",
    },
  },
};

const Table = {
  parts: ["th"],
  baseStyle: {
    th: {
      textTransform: "capitalize",
      letterSpacing: "normal",

      fontWeight: "600",
    },
  },
};

const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        fontSize: "sm",
        scrollbarWidth: "none",
        bg: mode("gray.50", "gray.900")(props),
        minH: "100vh",
      },
    }),
  },
  config,
  components: {
    Button,
    Table,
  },
});
export default theme;
