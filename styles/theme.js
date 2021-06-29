import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

const global = {
  styles: {
    global: {
      "html, body": {
        fontSize: "sm",
      },
    },
  },
};

const Button = {
  baseStyle: {
    _focus: {
      boxShadow: "none",
    },
  },
};

const theme = extendTheme({
  config,
  global,
  components: {
    Button,
  },
});

export default theme;
