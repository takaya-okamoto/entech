import {
  Box,
  Button,
  Flex,
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
      <Box bgColor="rgba(0,0,0,0.2)" w={"200px"} h={"140px"}>
        <Text
          p={".5rem"}
          borderRadius={"10px"}
          position={"absolute"}
          top={"50px"}
          left={"50px"}
          color={"white"}
          bgColor={ColorAssets.entechMainBlue}
          fontSize={"14px"}
        >
          en診断してみる
        </Text>
        <SampleChart />
      </Box>
    </ChakraLink>
  );
};
