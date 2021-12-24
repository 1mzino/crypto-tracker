import {
  Stack,
  Flex,
  Text,
  Icon,
  Divider,
  Box,
  useColorModeValue,
  Accordion,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  UnorderedList,
  ListItem,
  HStack,
  Button,
} from "@chakra-ui/react";

import AccordionItem from "./AccordionItem";

import { AiOutlineLink } from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";
import { BiLinkAlt } from "react-icons/bi";
import {
  RiFilePaper2Line,
  RiChat1Line,
  RiWindowLine,
  RiLinksLine,
  RiWindowFill,
} from "react-icons/ri";
// import { getAllLinks } from "../utils/getAllLinks";
import GetAllLinks from "../utils/getAllLinks";
import { PopoverItem } from "./PopoverItem";

import { useRouter } from "next/router";

const CoinLinks = ({ links }) => {
  const router = useRouter();
  const pushRouter = (url) => {
    router.push(url);
  };
  return (
    <>
      {/* MOBILE */}
      <Accordion
        display={["flex", null, "none"]}
        borderBottom="none"
        allowToggle
        mt={4}
      >
        <Stack w="100%" spacing={1} divider={<Divider />}>
          <AccordionItem title={`Website`} icon={BiLinkAlt}>
            <GetAllLinks links={links.homepage} handleClick={pushRouter} />
          </AccordionItem>

          <AccordionItem title={`Contracts`} icon={RiFilePaper2Line}>
            <GetAllLinks links={links.blockchain} handleClick={pushRouter} />
          </AccordionItem>

          {(links.chat.filter((link) => link !== "").length > 0 ||
            links.forum.filter((link) => link !== "").length > 0) && (
            <AccordionItem title={`Forums and Chats`} icon={RiWindowFill}>
              <GetAllLinks links={links.forum} handleClick={pushRouter} />
              <GetAllLinks links={links.chat} handleClick={pushRouter} />
            </AccordionItem>
          )}
        </Stack>
      </Accordion>

      {/* DESKTOP */}
      <HStack
        spacing={3}
        display={["none", null, "flex"]}
        flexBasis={"40%"}
        my={2}
      >
        {links.homepage.filter((link) => link != "").length >= 0 && (
          <PopoverItem title={`Website`} icon={BiLinkAlt}>
            <GetAllLinks links={links.homepage} handleClick={pushRouter} />
          </PopoverItem>
        )}

        {links.blockchain.filter((link) => link != "").length > 1 && (
          <PopoverItem title={`Contracts`} icon={RiFilePaper2Line}>
            <GetAllLinks links={links.blockchain} handleClick={pushRouter} />
          </PopoverItem>
        )}

        {links.forum.filter((link) => link != "").length > 0 &&
          links.chat.filter((link) => link != "").length > 0 && (
            <PopoverItem title={`Forums and Chats`} icon={RiWindowFill}>
              <GetAllLinks links={links.forum} handleClick={pushRouter} />
              <GetAllLinks links={links.chat} handleClick={pushRouter} />
            </PopoverItem>
          )}
      </HStack>
    </>
  );
};

export default CoinLinks;
