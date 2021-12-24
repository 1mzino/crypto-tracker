import {
  AccordionItem as Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Flex,
  Stack,
  Text,
  Icon,
} from "@chakra-ui/react";

const AccordionItem = ({ title, icon, children }) => {
  return (
    <Accordion border="none">
      <h2>
        <AccordionButton
          _focus={{ boxShadow: "none" }}
          _hover={{ bg: "none" }}
          ps={2}
          py={3}
        >
          <Flex flex="1" align="center">
            <Text fontSize="15px" fontWeight={500}>
              <Text as="span">
                <Icon h="16px" w="16px" as={icon} me={2} />
              </Text>
              {title}
            </Text>
          </Flex>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel ps={2} pb={2} fontSize="small" color="gray.500">
        <Stack>{children}</Stack>
      </AccordionPanel>
    </Accordion>
  );
};

export default AccordionItem;
