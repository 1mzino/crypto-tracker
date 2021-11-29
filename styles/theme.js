import { baseStyle, extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

const global = {
  styles: {
    global: {
      "html, body": {
        fontSize: "sm",
        scrollbarWidth: "none",

        // bg: props.colorMode === "dark" ? darkMode : lightMode,
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

// const theme = extendTheme({
//   config,
//   global,
//   components: {
//     Button,
//     Table,
//   },
// });

const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        fontSize: "sm",
        scrollbarWidth: "none",
        bg: mode("gray.50", "gray.900")(props),
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

// const global = {
//   styles: {
//     global: (props) => ({
//       body: {
//         body: {
//           fontFamily: "body",
//           fontSize: "sm",
//           scrollbarWidth: "none",
//           color: mode("gray.800", "whiteAlpha.900")(props),
//           bg: mode("gray.50", "gray.800")(props),
//           lineHeight: "base",
//         },
//         "*::placeholder": {
//           color: mode("gray.400", "whiteAlpha.400")(props),
//         },
//         "*, *::before, &::after": {
//           borderColor: mode("gray.200", "whiteAlpha.300")(props),
//           wordWrap: "break-word",
//         },
//       },
//     }),
//   },
// };
