import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  HStack,
  VStack,
  Spacer,
} from "@chakra-ui/react";
import { useColorAssets } from "../../hooks/view/useColorAssets";
import { RiQuestionnaireLine } from "react-icons/ri";
import { GoGraph } from "react-icons/go";
import { router } from "next/client";
import { SampleChart } from "./sampleChart";

const EnAgnoseSlide1 = (): JSX.Element => {
  const [slideNum, setSlideNum] = useState<number>(0);
  const ColorAssets = useColorAssets();
  return (
    <VStack pt={"36px"} pb={"28px"} spacing={"40px"}>
      <HStack>
        <Box
          w={"120px"}
          h={"80px"}
          bgColor={ColorAssets.entechSubBlue}
          boxShadow={"lg"}
          rounded={"30"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <RiQuestionnaireLine color={ColorAssets.white} size={"52px"} />
        </Box>
        <Spacer />
        <Text color={ColorAssets.white} as={"b"}>
          10この質問から...
        </Text>
      </HStack>
      <HStack>
        <Text color={ColorAssets.white} as={"b"}>
          性格を分析し...
        </Text>
        <Spacer />
        <Box
          position={"relative"}
          w={"120px"}
          h={"80px"}
          bgColor={ColorAssets.entechSubBlue}
          boxShadow={"lg"}
          rounded={"30"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <GoGraph color={ColorAssets.white} size={"52px"} />
        </Box>
        <Spacer />
      </HStack>
      <Box
        ml={"2rem"}
        w={"200px"}
        h={"120px"}
        bgColor={ColorAssets.entechSubBlue}
        boxShadow={"lg"}
        rounded={"30"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box
          bgColor={"#FFFFFE"}
          rounded={"30"}
          w={"180px"}
          h={"100px"}
          pr={"20px"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <SampleChart />
        </Box>
      </Box>
      <Text color={ColorAssets.white} as={"b"}>
        あなたのことを知ってもらいましょう
      </Text>
    </VStack>
  );
};
export default EnAgnoseSlide1;
