import {
  Grid,
  GridItem,
  Heading,
  Stack,
  useColorModeValue,
  Flex,
  Box,
  Icon,
  HStack,
  Text,
  SimpleGrid,
  useDisclosure,
  Collapse,
} from "@chakra-ui/react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import CardDetail from "./CardDetail";
import AnimateHeightGrid from "./AnimateHeightGrid";
import { useState, useRef, useEffect } from "react";

const GridVariants = {
  closed: {
    height: 130,
  },
  open: {
    height: "auto",
    transition: {
      type: "spring",
      duration: 0.5,
    },
  },
};

const CardView = ({ coins, heading, variants }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);
  const [viewHeight, setViewHeight] = useState(130);

  const getResized = (height) => {
    timeout = setTimeout(() => {
      setViewHeight(height);
    }, 300);
  };
  let timeout = null;

  const handleResize = () => {
    const screenWidth = window.innerWidth;
    clearTimeout(timeout);
    if (screenWidth < 768) {
      getResized(120);
      console.log(`set height to 120`);
    }
    if (screenWidth < 992 && screenWidth > 768) {
      getResized(140);
      console.log(`set height to 140`);
    }
    if (screenWidth > 992) {
      getResized(160);
      console.log(`set height to 180`);
    }
  };

  useEffect(() => {
    const screenWidth = window.innerWidth;

    //RUNS ON FIRST RENDER
    if (screenWidth < 768) {
      setViewHeight(120);
    }
    if (screenWidth < 992 && screenWidth > 768) {
      setViewHeight(140);
    }
    if (screenWidth > 992) {
      setViewHeight(160);
    }

    //LISTENS TO WHEN SCREEN IS RESIZED

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const MotionSimpleGrid = motion(SimpleGrid);
  const MotionStack = motion(Stack);
  const MotionBox = motion(Box);

  let hasRenderedRef = useRef(false);

  useEffect(() => {
    hasRenderedRef.current = true;
  });

  return (
    <>
      <HStack
        px={1}
        pt={0.5}
        w="fit-content"
        onClick={toggleOpen}
        cursor="pointer"
        mb={[2, null, null, null, 2]}
        align="center"
      >
        <Heading fontSize={["xl"]}>{heading}</Heading>
        <Icon
          as={isOpen ? BsChevronUp : BsChevronDown}
          w={3}
          h={3}
          ml={["0.5rem", null, null, "0.75rem"]}
        />
      </HStack>

      <Collapse in={isOpen} startingHeight={viewHeight}>
        <SimpleGrid py={2} minChildWidth={[100, 175, 200, 300]} gap="1rem">
          {coins.map((coin) => (
            <CardDetail key={coin.id} coin={coin} />
          ))}
        </SimpleGrid>
      </Collapse>
    </>
  );
};

export default CardView;
