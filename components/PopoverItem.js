import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Portal,
  Button,
  Stack,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";

const PopoverItem = ({ title, icon, children }) => {
  return (
    <Popover placement="bottom-start" trigger="hover">
      <PopoverTrigger>
        <Button py={3.5} px={3} size="xs" fontSize="smaller">
          <Icon as={icon} me={2} />
          {title}
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent
          bg={useColorModeValue("white", "gray.800")}
          mx={4}
          w="max-content"
        >
          <PopoverArrow bg={useColorModeValue("white", "gray.800")} />
          <PopoverBody
            px={0}
            display="flex"
            flexDir="column"
            fontSize="xs"
            color={useColorModeValue("gray.700", "gray.300")}
          >
            {children}
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export { PopoverItem };
