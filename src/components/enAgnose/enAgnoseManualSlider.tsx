import { Flex } from "@chakra-ui/react";
import EnAgnoseSlide1 from "./enAgnoseSlide1";
import EnAgnoseSlide2 from "./enAgnoseSlide2";
import { Dispatch, SetStateAction } from "react";
import EnAgnoseResult from "../../pages/enAgnoseResult";

type Props = {
  slideNum: number;
  radioValue: string;
  setRadioValue: Dispatch<SetStateAction<string>>;
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

export const EnAgnoseManualSlider = (props: Props): JSX.Element => {
  return (
    <Flex direction={"column"}>
      {props.slideNum === 0 && <EnAgnoseSlide1 />}
      {props.slideNum !== 0 && props.slideNum !== 11 && (
        <EnAgnoseSlide2
          slideNum={props.slideNum}
          radioValue={props.radioValue}
          setRadioValue={props.setRadioValue}
        />
      )}
      {props.slideNum === 11 && (
        <EnAgnoseResult
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
      )}
    </Flex>
  );
};
