import {
  InputGroup,
  Input,
  InputLeftElement,
  InputRightElement,
  Button,
  Box,
  Text,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { MdClear } from "react-icons/md";

import useSWR from "swr";

import { FixedSizeList as List } from "react-window";

import Link from "next/link";

const SearchBar = () => {
  const { data: allCoins } = useSWR(
    "https://api.coingecko.com/api/v3/coins/list?include_platform=false",
    async (url) => {
      const res = await (await fetch(url)).json();
      return res;
    }
  );
  const [query, setQuery] = useState("");

  const [queriedCoins, setQueriedCoins] = useState([]);

  const handleQuery = (e) => {
    if (e.target.value === "") {
      setQuery("");
      setQueriedCoins([]);
      return;
    }
    setQuery(e.target.value);

    const matchingQueries = allCoins.filter((coin) =>
      coin.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setQueriedCoins(matchingQueries);
  };

  const searchInput = useRef(null);
  const Row = ({ index, style }) => (
    <div style={style}>
      <Link
        href={`http://localhost:3000/cryptocurrencies/${queriedCoins[index].id}`}
      >
        <Flex
          onClick={() => setQuery("")}
          borderTopRadius={index === 0 ? "md" : "none"}
          alignItems="center"
          cursor="pointer"
          _hover={{ bg: hoverColor }}
          px={4}
          height="full"
        >
          <Text
            isTruncated={queriedCoins[index].id.length <= 40}
            fontSize="xs"
            fontWeight={500}
          >
            {queriedCoins[index].name}
          </Text>
        </Flex>
      </Link>
    </div>
  );

  const queryBG = useColorModeValue("white", "gray.900");
  const hoverColor = useColorModeValue("gray.100", "gray.800");
  const borderColor = useColorModeValue("gray.100", "gray.600");

  return (
    <Box pos="relative">
      <InputGroup cursor="pointer" w="200px" variant="filled">
        <InputLeftElement color="gray.500" children={<BiSearch />} />
        <Input
          ref={searchInput}
          value={query}
          onChange={handleQuery}
          type="text"
          cursor="pointer"
          fontSize="xs"
          fontWeight={500}
          placeholder="Search"
          _placeholder={{
            color: useColorModeValue("gray.600", "gray.400"),
          }}
        />

        {query.length > 0 && queriedCoins.length > 0 && (
          <InputRightElement bg="transparent">
            <Button onClick={() => setQuery("")} px={1} size="xs">
              <MdClear />
            </Button>
          </InputRightElement>
        )}
      </InputGroup>
      {queriedCoins.length > 0 && (
        <Box
          border="1px"
          borderColor={borderColor}
          zIndex={99}
          shadow="sm"
          maxH="230px"
          w="200px"
          borderRadius="md"
          pb={1}
          bg={queryBG}
          pos="absolute"
          top="50px"
        >
          <List
            height={Math.min(200, 42 * queriedCoins.length)}
            itemCount={queriedCoins.length}
            itemSize={42}
            width={198}
          >
            {Row}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default SearchBar;
