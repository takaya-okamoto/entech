import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  HStack,
  VStack,
  Spacer,
  useToast,
} from "@chakra-ui/react";
import { useColorAssets } from "../hooks/view/useColorAssets";
import { EnAgnoseManualSlider } from "../components/enAgnose/enAgnoseManualSlider";
import { useRouter } from "next/router";
import { EnAgnoseCalculation } from "../components/enAgnose/enAgnoseCalculation";
import { UploadImage } from "../lib/clientSide/storage/uploadImage";
import { PostType } from "../types/postType";
import { WritePost } from "../lib/clientSide/firestore/writePost";
import { useMyAccount } from "../hooks/logic/useMyAccount";
import { EnAgnoseType } from "../types/enAgnoseType";
import { WriteAgnose } from "../lib/clientSide/firestore/writeAgnose";

const EnAgnosePage = (): JSX.Element => {
  const [slideNum, setSlideNum] = useState<number>(0);
  const [radioValue, setRadioValue] = useState<string>("3");
  const [leadership, setLeadership] = useState<number>(0);
  const [sociability, setSociability] = useState<number>(0);
  const [cooperativeness, setCooperativeness] = useState<number>(0);
  const [independence, setIndependence] = useState<number>(0);
  const [openness, setOpenness] = useState<number>(0);
  const ColorAssets = useColorAssets();
  const router = useRouter();
  const [answer, setAnswer] = useState<{ num: number; val: string }[]>([]);
  const [answerNum, setAnswerNum] = useState(0);
  const { user } = useMyAccount();
  const toast = useToast();
  const handleSubmit = async (): Promise<void> => {
    console.log("handleSubmit");
    if (!user) return;
    const id = user.uid;
    console.log(leadership);
    const info: EnAgnoseType = {
      id,
      leadership: leadership,
      sociability: sociability,
      cooperativeness: cooperativeness,
      independence: independence,
      openness: openness,
    };
    console.log({ info });
    try {
      await WriteAgnose(info);
      toast({
        title: "診断結果を保存しました。",
        status: "success",
        position: "top",
        isClosable: true,
      });
    } catch (e) {
      console.error(e);
      toast({
        title: "診断結果の保存に失敗しました",
        status: "success",
        position: "top",
        isClosable: true,
      });
    }
  };

  console.log({ answer });

  return (
    <Box
      pos="fixed"
      w="100%"
      h="100vh"
      left={0}
      top={0}
      bg="rgba(0, 0, 0, 0.3)"
      zIndex={"1000"}
    >
      <Flex minH={"100vh"} alignItems={"center"} justify={"center"}>
        <Box
          bgColor={ColorAssets.entechMainBlue}
          mb={"3rem"}
          w={"300px"}
          h={"580px"}
          rounded={"8"}
          boxShadow={"md"}
        >
          <VStack>
            <EnAgnoseManualSlider
              slideNum={slideNum}
              radioValue={radioValue}
              setRadioValue={setRadioValue}
              answer_={answer}
              leadership={leadership}
              setLeadership={setLeadership}
              sociability={sociability}
              setSociability={setSociability}
              cooperativeness={cooperativeness}
              setCooperativeness={setCooperativeness}
              independence={independence}
              setIndependence={setIndependence}
              openness={openness}
              setOpenness={setOpenness}
            />
            <HStack spacing={"12px"}>
              {slideNum !== 11 && (
                <Button
                  color={ColorAssets.white}
                  bgColor={ColorAssets.entechMainBlue}
                  fontSize={"28px"}
                  borderWidth={"1px"}
                  borderColor={ColorAssets.white}
                  borderRadius={"5px"}
                  px={"1rem"}
                  w={"60px"}
                  transition={".3s"}
                  onClick={() => {
                    slideNum === 0 && router.push("/account/profile");

                    if (slideNum !== 0) {
                      const answer_ = answer.filter((a) => {
                        return answer.length - 1 !== a.num;
                      });
                      console.log({ answer_ });
                      // answer.pop();
                      // const answer_ = answer;
                      setAnswer(answer_ ?? { num: 0, val: "3" });
                    }

                    setSlideNum((prev) => prev - 1);
                  }}
                  _hover={{
                    bgColor: ColorAssets.entechSubBlue,
                    borderColor: ColorAssets.entechSubBlue,
                  }}
                >
                  {slideNum === 0 && "×"}
                  {slideNum !== 0 && "戻る"}
                </Button>
              )}

              <Button
                color={ColorAssets.white}
                bgColor={ColorAssets.entechMainBlue}
                fontSize={"20px"}
                borderWidth={"1px"}
                borderColor={ColorAssets.white}
                borderRadius={"5px"}
                px={"1rem"}
                w={"160px"}
                transition={".3s"}
                onClick={async (): Promise<void> => {
                  setSlideNum((prev) => prev + 1);
                  console.log({ slideNum });
                  if (slideNum !== 0 && slideNum < 11) {
                    const answer_: { num: number; val: string }[] = answer;
                    answer_.push({
                      num: slideNum - 1,
                      val: radioValue,
                    });
                    setAnswerNum((prev) => prev + 1);
                    setAnswer(answer_);
                  } else if (slideNum === 11) {
                    await handleSubmit();
                    await router.push("/account/editProfile");
                  }
                }}
                _hover={{
                  bgColor: ColorAssets.entechSubBlue,
                  borderColor: ColorAssets.entechSubBlue,
                }}
              >
                {slideNum === 0 && "診断する"}
                {slideNum !== 0 && slideNum < 10 && "次へ"}
                {slideNum === 10 && "診断結果へ"}
                {slideNum === 11 && "結果を閉じる"}
              </Button>
            </HStack>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};
export default EnAgnosePage;
