import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Link as ChakraLink,
  Text,
} from "@chakra-ui/react";
import { useColorAssets } from "hooks/view/useColorAssets";
import { FC, MouseEventHandler } from "react";
import Link from "next/link";
import { SampleChart } from "../../enAgnose/sampleChart";

type Props = {
  onClick?: MouseEventHandler;
};

export const EnAgnoseButton: FC<Props> = (props) => {
  const ColorAssets = useColorAssets();

  return (
    <ChakraLink
      as={Link}
      href={"/enAgnose/enAgnose"}
      w={"100%"}
      position={`relative`}
      _hover={{ textDecoration: "none" }}
    >
      <Flex pt={"12px"} pl={"12px"}>
        <Flex
          bgColor="rgba(0,0,0,0.2)"
          w={"180px"}
          h={"120px"}
          alignItems={"center"}
          justifyContent={"center"}
          rounded={"5"}
        >
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            w={"140px"}
            h={"70px"}
            bgColor={ColorAssets.entechMainBlue}
            pos={"absolute"}
            rounded={"10"}
            boxShadow={"lg"}
          >
            <HStack>
              <Text
                color={ColorAssets.yellow}
                fontSize={"18px"}
                pb={"2px"}
                fontWeight={"bold"}
              >
                en
              </Text>

              <Text
                color={ColorAssets.white}
                fontSize={"16px"}
                fontWeight={"bold"}
              >
                診断してみる
              </Text>
            </HStack>
          </Flex>
          <Flex alignItems={"center"} justifyContent={"center"} mr={"18px"}>
            <SampleChart />
          </Flex>
        </Flex>
      </Flex>
    </ChakraLink>
  );
};
