import { useColorAssets } from "../../hooks/view/useColorAssets";
import { Box, VStack } from "@chakra-ui/react";
import { EnAgnoseCalculation } from "../../components/enAgnose/enAgnoseCalculation";
import { Dispatch, SetStateAction } from "react";

type Props = {
  answer_: { num: number; val: string }[];
  leadership: number;
  setLeadership: Dispatch<SetStateAction<number>>;
  sociability: number;
  setSociability: Dispatch<SetStateAction<number>>;
  cooperativeness: number;
  setCooperativeness: Dispatch<SetStateAction<number>>;
  independence: number;
  setIndependence: Dispatch<SetStateAction<number>>;
  openness: number;
  setOpenness: Dispatch<SetStateAction<number>>;
};
const EnAgnoseResult = (props: Props): JSX.Element => {
  const ColorAssets = useColorAssets();
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
        <EnAgnoseCalculation
          answer_={props.answer_}
          leadership={props.leadership}
          setLeadership={props.setLeadership}
          sociability={props.sociability}
          setSociability={props.setSociability}
          cooperativeness={props.cooperativeness}
          setCooperativeness={props.setCooperativeness}
          independence={props.independence}
          setIndependence={props.setIndependence}
          openness={props.openness}
          setOpenness={props.setOpenness}
        />
      </Box>
    </VStack>
  );
};
export default EnAgnoseResult;
