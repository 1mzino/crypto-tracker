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
  useMediaQuery,
} from "@chakra-ui/react";
import { useContext } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { CurrencyContext } from "../contexts/CurrencyContext";
import { SupportedCurrenciesContext } from "../contexts/SupportedCurrenciesContext";

import CurrencyIcon from "./CurrencyIcon";

const CurrencySelector = ({ onClose }) => {
  const { currency, dispatch } = useContext(CurrencyContext);
  const { supportedCurrencies } = useContext(SupportedCurrenciesContext);

  const [isDesktop] = useMediaQuery("(min-width: 992px)");

  const {
    isOpen: isOpenCurrencyModal,
    onOpen: onOpenCurrencyModal,
    onClose: onCloseCurrencyModal,
  } = useDisclosure();

  return (
    <>
      <HStack cursor="pointer" onClick={onOpenCurrencyModal} spacing={2}>
        <Text fontWeight={600} fontSize="md">
          {currency.shorthand.toUpperCase()}
        </Text>
        <Icon h="12px" w="12px" as={AiFillCaretDown} />
      </HStack>

      <Modal
        size={isDesktop ? "3xl" : "full"}
        isOpen={isOpenCurrencyModal}
        onClose={onCloseCurrencyModal}
        borderRadius={isDesktop ? "xl" : "none"}
      >
        <ModalOverlay bg="blackAlpha.800" />
        <ModalContent
          borderRadius={isDesktop ? "xl" : "none"}
          bg={useColorModeValue("white", "gray.900")}
          bgGradient={useColorModeValue(
            "",
            "linear(to-b, gray.800, gray.800, gray.900)"
          )}
          my={isDesktop ? "5rem" : 0}
        >
          <ModalHeader
            borderTopRadius={isDesktop ? "xl" : "none"}
            bg={useColorModeValue("white", "gray.900")}
            py={4}
          >
            Select Currency
          </ModalHeader>
          <ModalCloseButton m={2} />
          <ModalBody>
            <Stack pb={4} spacing={4}>
              <Stack fontWeight={500}>
                <Text fontSize="xs" color="gray.400">
                  Popular Currencies
                </Text>
                <SimpleGrid minChildWidth="160px" spacing={4}>
                  {supportedCurrencies.map((currency, i) =>
                    currency.popular ? (
                      <CurrencyIcon
                        key={i}
                        currency={currency}
                        dispatch={dispatch}
                        onClose={onClose}
                        onCloseCurrencyModal={onCloseCurrencyModal}
                      />
                    ) : null
                  )}
                </SimpleGrid>

                <Text fontSize="xs" color="gray.400">
                  Bitcoin Units
                </Text>
                <SimpleGrid minChildWidth="160px" spacing={4}>
                  {supportedCurrencies.map((currency, i) =>
                    currency.type === "BITCOIN" ? (
                      <CurrencyIcon
                        key={i}
                        currency={currency}
                        dispatch={dispatch}
                        onCloseCurrencyModal={onCloseCurrencyModal}
                        onClose={onClose}
                      />
                    ) : null
                  )}
                </SimpleGrid>

                <Text fontSize="xs" color="gray.400">
                  FIAT Currencies
                </Text>
                <SimpleGrid minChildWidth="160px" spacing={4}>
                  {supportedCurrencies.map((currency, i) =>
                    currency.type === "FIAT" ? (
                      <CurrencyIcon
                        key={i}
                        currency={currency}
                        dispatch={dispatch}
                        onCloseCurrencyModal={onCloseCurrencyModal}
                        onClose={onClose}
                      />
                    ) : null
                  )}
                </SimpleGrid>
              </Stack>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
    // <Menu pos="relative" zIndex={999999} autoSelect={false}>
    //   <MenuButton bg="none">
    //     <HStack spacing={2}>
    //       <Text fontWeight={600} fontSize="md">
    //         {currency ? currency.shorthand.toUpperCase() : "error"}
    //       </Text>
    //       <Icon h="12px" w="12px" as={AiFillCaretDown} />
    //     </HStack>
    //   </MenuButton>
    //   <MenuList
    //     bg={useColorModeValue("white", "gray.900")}
    //     fontSize="lg"
    //     minW="10em"
    //   >
    //     <MenuItem onClick={() => dispatch({ type: "GBP" })}>
    //       Pound Sterling
    //     </MenuItem>
    //     <MenuItem onClick={() => dispatch({ type: "USD" })}>US Dollar</MenuItem>
    //     <MenuItem onClick={() => dispatch({ type: "EUR" })}>Euro</MenuItem>
    //   </MenuList>
    // </Menu>
  );
};

export default CurrencySelector;
