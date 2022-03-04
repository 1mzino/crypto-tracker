import {
  HStack,
  Box,
  Text,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useColorModeValue,
  useDisclosure,
  Button,
  Stack,
  SimpleGrid,
  InputGroup,
  Input,
  InputLeftElement,
  Divider,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
  useMediaQuery,
} from "@chakra-ui/react";
import { useContext } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { CurrencyContext } from "../contexts/CurrencyContext";

import CurrencyIcon from "./CurrencyIcon";

// hard coded array to differentiate FIAT from CRYPTO
const supportedCurrencies = [
  {
    name: "Pound Sterling",
    symbol: "£",
    abv: "GBP",
    type: "FIAT",
    popular: true,
  },
  {
    name: "United States Dollar",
    symbol: "$",
    abv: "USD",
    type: "FIAT",
    popular: true,
  },
  {
    name: "Euro",
    symbol: "€",
    abv: "EUR",
    type: "FIAT",
    popular: true,
  },
  {
    name: "Bitcoin",
    symbol: "BTC",
    abv: "BTC",
    type: "CRYPTO",
    popular: true,
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    abv: "ETH",
    type: "CRYPTO",
    popular: true,
  },
  {
    name: "Bits",
    symbol: "BITS",
    abv: "BITS",
    type: "BITCOIN",
  },
  {
    name: "Satoshi",
    symbol: "SATS",
    abv: "SATS",
    type: "BITCOIN",
  },
];

const CurrencySelector = ({ onClose }) => {
  const { currency, dispatch } = useContext(CurrencyContext);

  const [isDesktop] = useMediaQuery("(min-width: 992px)");

  const {
    isOpen: isOpenCurrencyModal,
    onOpen: onOpenCurrencyModal,
    onClose: onCloseCurrencyModal,
  } = useDisclosure();

  return (
    <Menu>
      <MenuButton bg="transparent" as={Button} rightIcon={<AiFillCaretDown />}>
        {currency.shorthand}
      </MenuButton>
      <MenuList
        minW="120px"
        bg={useColorModeValue("white", "gray.800")}
        fontSize="sm"
      >
        {supportedCurrencies.map((supportedCurrency) => (
          <MenuItem
            key={supportedCurrency.name}
            fontWeight={500}
            pl={4}
            onClick={() => {
              dispatch({ type: supportedCurrency.abv });
              onClose();
            }}
          >
            {<Text>{supportedCurrency.abv}</Text>}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );

  // return (
  //   <>
  // <HStack cursor="pointer" onClick={onOpenCurrencyModal} spacing={2}>
  //   <Text fontWeight={600} fontSize="md">
  //     {currency.shorthand.toUpperCase()}
  //   </Text>
  //   <Icon h="12px" w="12px" as={AiFillCaretDown} />
  // </HStack>

  //     <Modal
  //       overflow="hidden"
  //       size={isDesktop ? "3xl" : "full"}
  //       isOpen={isOpenCurrencyModal}
  //       onClose={onCloseCurrencyModal}
  //       borderRadius={isDesktop ? "xl" : "none"}
  //     >
  //       <ModalOverlay />
  //       <ModalContent
  //         pos="fixed"
  //         borderRadius={isDesktop ? "xl" : "none"}
  //         bg={useColorModeValue("white", "gray.800")}
  //         my={isDesktop ? "5rem" : 0}
  //       >
  //         <ModalHeader
  //           borderTopRadius={isDesktop ? "xl" : "none"}
  //           bg={useColorModeValue("white", "gray.900")}
  //           py={4}
  //         >
  //           Select Currency
  //         </ModalHeader>
  //         <ModalCloseButton m={2} />
  //         <ModalBody>
  //           <Stack pb={4} spacing={4}>
  //             <Stack fontWeight={500}>
  //               <Text fontSize="xs" color="gray.400">
  //                 Popular Currencies
  //               </Text>
  //               <SimpleGrid minChildWidth="160px" spacing={4}>
  //                 {supportedCurrencies.map((data, i) =>
  //                   data.popular ? (
  //                     <CurrencyIcon
  //                       key={i}
  //                       currency={currency}
  //                       dispatch={dispatch}
  //                       onClose={onClose}
  //                       onCloseCurrencyModal={onCloseCurrencyModal}
  //                     />
  //                   ) : null
  //                 )}
  //               </SimpleGrid>

  //               <Text fontSize="xs" color="gray.400">
  //                 Bitcoin Units
  //               </Text>
  //               <SimpleGrid minChildWidth="160px" spacing={4}>
  //                 {supportedCurrencies.map((data, i) =>
  //                   data.type === "BITCOIN" ? (
  //                     <CurrencyIcon
  //                       key={i}
  //                       data={data}
  //                       currency={currency}
  //                       dispatch={dispatch}
  //                       onCloseCurrencyModal={onCloseCurrencyModal}
  //                       onClose={onClose}
  //                     />
  //                   ) : null
  //                 )}
  //               </SimpleGrid>

  //               <Text fontSize="xs" color="gray.400">
  //                 FIAT Currencies
  //               </Text>
  //               <SimpleGrid minChildWidth="160px" spacing={4}>
  //                 {supportedCurrencies.map((data, i) =>
  //                   data.type === "FIAT" ? (
  //                     <CurrencyIcon
  //                       key={i}
  //                       currency={currency}
  //                       dispatch={dispatch}
  //                       onCloseCurrencyModal={onCloseCurrencyModal}
  //                       onClose={onClose}
  //                     />
  //                   ) : null
  //                 )}
  //               </SimpleGrid>
  //             </Stack>
  //           </Stack>
  //         </ModalBody>
  //       </ModalContent>
  //     </Modal>
  //   </>
  // );
};

export default CurrencySelector;
