import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { useColorAssets } from "../hooks/view/useColorAssets";
import { ManualSlider } from "../components/login/manualSlider";
import { useState } from "react";

const LoginBeforeTop = (): JSX.Element => {
  const [slideNum, setSlideNum] = useState<number>(0);
  const ColorAssets = useColorAssets();
  return (
    <Flex
      bgColor={ColorAssets.entechMainBlue}
      minH={"100vh"}
      direction={"column"}
      alignItems={"center"}
    >
      <Flex
        mt={slideNum === 3 ? "5rem" : "14rem"}
        mb={"3rem"}
        direction={"column"}
        alignItems={"center"}
      >
        <Image alt={"entech-logo"} src={"/svg/entech-logo.svg"} w={"150px"} />
        <Flex fontSize={"60px"}>
          <Text color={ColorAssets.yellow}>en</Text>
          <Text color={ColorAssets.white}>tech</Text>
        </Flex>
      </Flex>

      <ManualSlider slideNum={slideNum} />

      <Flex gap={10}>
        {slideNum !== 0 && (
          <Button
            color={ColorAssets.white}
            bgColor={ColorAssets.entechMainBlue}
            fontSize={"20px"}
            borderWidth={"1px"}
            borderColor={ColorAssets.white}
            borderRadius={"5px"}
            px={"1rem"}
            w={"100px"}
            transition={".3s"}
            onClick={() => {
              setSlideNum((prev) => prev - 1);
            }}
            _hover={{
              bgColor: ColorAssets.entechSubBlue,
              borderColor: ColorAssets.entechSubBlue,
            }}
          >
            PREV
          </Button>
        )}

        {slideNum !== 3 && (
          <Button
            color={ColorAssets.white}
            bgColor={ColorAssets.entechMainBlue}
            fontWeight={"semibold"}
            fontSize={"20px"}
            borderWidth={"1px"}
            borderColor={ColorAssets.white}
            borderRadius={"5px"}
            transition={".3s"}
            px={"1rem"}
            w={"100px"}
            onClick={() => {
              setSlideNum((prev) => prev + 1);
            }}
            _hover={{
              bgColor: ColorAssets.entechSubBlue,
              borderColor: ColorAssets.entechSubBlue,
            }}
          >
            NEXT
          </Button>
        )}
      </Flex>
    </Flex>
  );
};
export default LoginBeforeTop;
