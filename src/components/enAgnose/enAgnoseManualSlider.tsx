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
      {props.slideNum === 11 && <EnAgnoseResult answer_={props.answer_} />}
    </Flex>
  );
};
