import { Text, Button, Icon, useColorModeValue } from "@chakra-ui/react";
import { FiExternalLink } from "react-icons/fi";

const GetAllLinks = ({ links, handleClick }) => {
  return links
    .filter((link) => link !== "")
    .map((link, i) => {
      return (
        <a href={link} key={i}>
          <Button
            onClick={() => handleClick(link)}
            w="100%"
            borderRadius="none"
            ps={3}
            pe={8}
            size="xs"
            bg="none"
            justifyContent="flex-start"
            _hover={{
              bg: useColorModeValue("gray.100", "gray.700"),
              textUnderlinePosition: "under",
              transition: "0.25s ease-in",
            }}
            key={link}
          >
            {link.split("/")[2]}

            <Icon mx={1} as={FiExternalLink} />
          </Button>
        </a>
      );
    });
};

export default GetAllLinks;
