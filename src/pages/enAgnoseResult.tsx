import { useColorAssets } from "../hooks/view/useColorAssets";
import { Box, VStack } from "@chakra-ui/react";
import { EnAgnoseCalculation } from "../components/enAgnose/enAgnoseCalculation";

type Props = {
  answer_: { num: number; val: string }[];
};
const EnAgnoseResult = (props: Props): JSX.Element => {
  const ColorAssets = useColorAssets();
  console.log(2);
  return (
    <VStack pt={"120px"} pb={"28px"} spacing={"80px"}>
      <Box
        display={"flex"}
        w={"240px"}
        h={"200px"}
        bgColor={ColorAssets.entechSubBlue}
        boxShadow={"dark-lg"}
        rounded={"30"}
        alignItems={"center"}
        justifyContent={"center"}
        pr={"26px"}
      >
        <EnAgnoseCalculation answer_={props.answer_} />
      </Box>
    </VStack>
  );
};
export default EnAgnoseResult;
