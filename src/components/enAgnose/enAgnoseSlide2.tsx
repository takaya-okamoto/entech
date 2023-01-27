import { Dispatch, SetStateAction, useState } from "react";
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
import { RadioButtons } from "../common/button/radioButtons";
import { Color } from "@kurkle/color";

type Props = {
  slideNum: number;
  radioValue: string;
  setRadioValue: Dispatch<SetStateAction<string>>;
};
const EnAgnoseSlide2 = (props: Props): JSX.Element => {
  const ColorAssets = useColorAssets();
  return (
    <VStack pt={"120px"} pb={"28px"} spacing={"80px"}>
      <Box>
        <Box
          position={"relative"}
          w={"240px"}
          h={"200px"}
          bgColor={ColorAssets.entechSubBlue}
          boxShadow={"dark-lg"}
          rounded={"30"}
        >
          <Box position={"relative"} pl={"12px"} pt={"12px"}>
            <HStack>
              <Text color={ColorAssets.white} fontSize={"32px"} as={"b"}>
                Q
              </Text>

              <Text color={ColorAssets.yellow} fontSize={"30px"} pl={"12px"}>
                {props.slideNum}
              </Text>
              <Text color={ColorAssets.white} fontSize={"20px"} pt={"4px"}>
                / 15
              </Text>
            </HStack>
          </Box>
          <Box display={"flex"} justifyContent={"center"} pt={"20px"}>
            <Text as={"b"} color={ColorAssets.white}>
              {props.slideNum === 1 && "人間観察をよくする方だ"}
              {props.slideNum === 2 && "自分の意見を突き通す方だ"}
              {props.slideNum === 3 && "相手の長所によく気づく方だ"}
              {props.slideNum === 4 &&
                `チームやグループを引っ張る役割を担うことが多い`}
              {props.slideNum === 5 && "他人を羨ましがることがよくある"}
              {props.slideNum === 6 && "他人の顔色をよく伺う方だ"}
              {props.slideNum === 7 && "好奇心が強い方だ"}
              {props.slideNum === 8 && "自分から話を振るのは得意な方だ"}
              {props.slideNum === 9 && "人前に出るのが得意な方だ"}
              {props.slideNum === 10 && "規則は絶対に守りたい"}
              {props.slideNum === 11 && "結末を予測して準備する方だ"}
              {props.slideNum === 12 && "客観視をよくする方だ"}
              {props.slideNum === 13 && "決断にはよく迷う方だ"}
              {props.slideNum === 14 && "他人に自分のことをよく話す方だ"}
              {props.slideNum === 15 && "自分を創造的な方だと思う"}
            </Text>
          </Box>
        </Box>
        <HStack justifyContent={"center"} spacing={"32px"} pt={"32px"}>
          <Text color={ColorAssets.white} fontSize={"8px"}>
            ← あてはまる
          </Text>
          <Text color={ColorAssets.white} fontSize={"8px"}>
            あてはまらない →
          </Text>
        </HStack>
        <Box
          pt={"12px"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <RadioButtons
            radioValue={props.radioValue}
            setRadioValue={props.setRadioValue}
          />
        </Box>
      </Box>
    </VStack>
  );
};
export default EnAgnoseSlide2;
