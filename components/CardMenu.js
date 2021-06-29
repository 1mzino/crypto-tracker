import {
  Button,
  Divider,
  HStack,
  Flex,
  Heading,
  Icon,
  useBreakpointValue,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";

const CardMenu = ({ handleClick, categories }) => {
  return (
    <>
      <HStack onClick={handleClick} spacing={[2, null, null, 4]}>
        {categories.map((category) => (
          <Button
            boxShadow="sm"
            bg={useColorModeValue("gray.100", "gray.700")}
            fontWeight={500}
            key={category.heading}
            value={category.heading}
            size="xs"
            fontSize={["11px", null, null, "xs"]}
          >
            {category.heading}
          </Button>
        ))}
      </HStack>
      <Divider opacity="75%" />
    </>
  );
};

export default CardMenu;
