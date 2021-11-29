import {
  Box,
  Flex,
  Center,
  Icon,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import CarouselDetail from "./CarouselDetail";

import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";

const MotionCenter = motion(Center);

const Carousel = ({ data }) => {
  const [isLargerThan428] = useMediaQuery("(min-width: 429px)");

  const [isArrowDisplayed, setIsArrowDisplayed] = useState({
    left: false,
    right: true,
  });

  const handleScroll = (e) => {
    const scrollPosition = e.target.scrollLeft;

    if (scrollPosition === 0) {
      return setIsArrowDisplayed({
        ...isArrowDisplayed,
        left: false,
        right: true,
      });
    }

    if (isLargerThan428 && scrollPosition >= 1200) {
      return setIsArrowDisplayed({
        ...isArrowDisplayed,
        left: true,
        right: false,
      });
    }

    if (scrollPosition >= 1585) {
      return setIsArrowDisplayed({
        ...isArrowDisplayed,
        left: true,
        right: false,
      });
    }
  };

  return (
    <Flex maxW="780px" overflow="hidden" pos="relative">
      <Flex
        id="carousel"
        overflowX="scroll"
        sx={{
          "&::-webkit-scrollbar": {
            display: "none",
            width: 0,
          },
          scrollbarWidth: "none",
        }}
        onScroll={handleScroll}
      >
        <AnimatePresence>
          {isArrowDisplayed.left && (
            <MotionCenter
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                document.getElementById("carousel").scroll({
                  left: 0,
                  behavior: "smooth",
                });
                setIsArrowDisplayed({
                  ...isArrowDisplayed,
                  left: false,
                  right: true,
                });
              }}
              cursor="pointer"
              pos="absolute"
              left="0"
              h="100%"
              w="32px"
              bgGradient={useColorModeValue(
                "linear(to-r, rgba(255, 255, 255), rgba(255, 255, 255, 0))",
                "linear(to-r,  rgba(22, 22, 22, 1),  rgba(22, 22, 22, 0))"
              )}
            >
              <Icon
                borderRadius="full"
                bg={useColorModeValue("gray.50", "gray.900")}
                color="gray.400"
                h={6}
                w={6}
                as={IoIosArrowDropleftCircle}
              />
            </MotionCenter>
          )}
        </AnimatePresence>
        {data.map((coin) => (
          <CarouselDetail key={coin.id} coinData={coin} />
        ))}
        <AnimatePresence>
          {isArrowDisplayed.right && (
            <MotionCenter
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                document.getElementById("carousel").scroll({
                  left: 1585,
                  behavior: "smooth",
                });
                setIsArrowDisplayed({
                  ...isArrowDisplayed,
                  left: true,
                  right: false,
                });
              }}
              cursor="pointer"
              pos="absolute"
              right="0"
              h="100%"
              w="32px"
              bgGradient={useColorModeValue(
                "linear(to-l, rgba(255, 255, 255), rgba(255, 255, 255, 0))",
                "linear(to-l,  rgba(22, 22, 22, 1),  rgba(22, 22, 22, 0))"
              )}
            >
              <Icon
                borderRadius="full"
                bg={useColorModeValue("gray.50", "gray.900")}
                color="gray.400"
                h={6}
                w={6}
                as={IoIosArrowDroprightCircle}
              />
            </MotionCenter>
          )}
        </AnimatePresence>
      </Flex>
    </Flex>
  );
};

export default Carousel;
