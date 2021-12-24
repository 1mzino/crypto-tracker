import {
  Stack,
  Box,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";

const CurrencyIcon = ({
  data,
  currency,
  dispatch,
  onCloseCurrencyModal,
  onClose,
}) => {
  console.log(data);
  console.log(currency);
  const toast = useToast();
  return (
    <Box>
      <Stack
        onClick={() => {
          onCloseCurrencyModal();
          onClose();
          dispatch({ type: currency.abv });
          toast({
            title: "Success!",
            description: `Currency changed to ${currency.shorthand}.`,
            status: "success",
            duration: 2000,
            position: "bottom",
            isClosable: true,
          });
        }}
        userSelect="none"
        cursor="pointer"
        spacing={0.5}
        fontSize="xs"
        borderRadius="md"
        p={2}
        bg={useColorModeValue("gray.50", "gray.900")}
        _hover={{ bg: useColorModeValue("gray.100", "blackAlpha.400") }}
        _active={{ bg: useColorModeValue("gray.200", "blackAlpha.600") }}
      >
        <Text>{currency.name}</Text>
        {currency.type === "CRYPTO" ? (
          <Text fontSize="xs" color="gray.500">
            {`${currency.abv}`}
          </Text>
        ) : (
          <Text fontSize="xs" color="gray.500">
            {`${currency.abv} -  ${currency.symbol}`}
          </Text>
        )}
      </Stack>
    </Box>
  );
};

export default CurrencyIcon;
