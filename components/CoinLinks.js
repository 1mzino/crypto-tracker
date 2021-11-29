import {
  useMediaQuery,
  useDisclosure,
  useColorModeValue,
  Stack,
  Button,
  Text,
  Divider,
  Spacer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import { BsChevronRight } from "react-icons/bs";

const CoinLinks = ({ coin }) => {
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");

  const {
    isOpen: isLinkModalOpen,
    onOpen: onLinkModalOpen,
    onClose: onLinkModalClose,
  } = useDisclosure();

  const {
    isOpen: isContractModalOpen,
    onOpen: onContractModalOpen,
    onClose: onContractModalClose,
  } = useDisclosure();

  const {
    isOpen: isTagsModalOpen,
    onOpen: onTagsModalOpen,
    onClose: onTagsModalClose,
  } = useDisclosure();

  if (isLargerThan1280) return <div>DESKTOP VERSION links</div>;

  return (
    <Stack>
      <Divider />
      <Button
        onClick={onLinkModalOpen}
        ps={1}
        pe={2}
        userSelect="none"
        bg="none"
        _hover={{ bg: "none" }}
        _active={{ bg: "none" }}
        fontSize="small"
      >
        <Text fontWeight={600}>Links</Text>

        <Spacer />
        <BsChevronRight />
      </Button>

      <Modal isOpen={isLinkModalOpen} onClose={onLinkModalClose}>
        <ModalOverlay />
        <ModalContent
          bg={useColorModeValue("gray.50", "gray.900")}
          borderRadius={0}
          my={0}
          minH="100%"
          minW="100%"
        >
          <ModalHeader>{`${coin.name} Links`}</ModalHeader>
          <ModalCloseButton />

          <ModalBody>links</ModalBody>
        </ModalContent>
      </Modal>

      <Divider />
      <Button
        onClick={onContractModalOpen}
        ps={1}
        pe={2}
        userSelect="none"
        bg="none"
        _hover={{ bg: "none" }}
        _active={{ bg: "none" }}
        fontSize="small"
      >
        <Text fontWeight={600}>Contracts</Text>

        <Spacer />
        <BsChevronRight />
      </Button>

      <Modal isOpen={isContractModalOpen} onClose={onContractModalClose}>
        <ModalOverlay />
        <ModalContent
          bg={useColorModeValue("gray.50", "gray.900")}
          borderRadius={0}
          my={0}
          minH="100%"
          minW="100%"
        >
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>contracts</ModalBody>
        </ModalContent>
      </Modal>

      <Divider />
      <Button
        onClick={onTagsModalOpen}
        ps={1}
        pe={2}
        userSelect="none"
        bg="none"
        _hover={{ bg: "none" }}
        _active={{ bg: "none" }}
        fontSize="small"
      >
        <Text fontWeight={600}>Tags</Text>

        <Spacer />
        <BsChevronRight />
      </Button>

      <Modal isOpen={isTagsModalOpen} onClose={onTagsModalClose}>
        <ModalOverlay />
        <ModalContent
          bg={useColorModeValue("gray.50", "gray.900")}
          borderRadius={0}
          my={0}
          minH="100%"
          minW="100%"
        >
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>tags</ModalBody>
        </ModalContent>
      </Modal>

      <Divider />
    </Stack>
  );
};

export default CoinLinks;
