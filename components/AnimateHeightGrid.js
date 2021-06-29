import { SimpleGrid, Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

const AnimateHeightGrid = ({ variants, isVisible, children }) => {
  const MotionGrid = motion(Box);
  return (
    <MotionGrid
      overflow="hidden"
      variants={variants}
      initial={isVisible ? "open " : "closed"}
      animate={isVisible ? "open" : "closed"}
    >
      {children}
    </MotionGrid>
  );
};

export default AnimateHeightGrid;
