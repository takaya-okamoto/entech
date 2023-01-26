import { Radio, RadioGroup } from "@chakra-ui/radio";
import { HStack } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

type Props = {
  radioValue: string;
  setRadioValue: Dispatch<SetStateAction<string>>;
};
export const RadioButtons = (props: Props): JSX.Element => {
  return (
    <RadioGroup onChange={props.setRadioValue} value={props.radioValue}>
      <HStack spacing={"28px"}>
        <Radio value={"5"} size={"lg"} />
        <Radio value={"4"} size={"lg"} />
        <Radio value={"3"} size={"lg"} />
        <Radio value={"2"} size={"lg"} />
        <Radio value={"1"} size={"lg"} />
      </HStack>
    </RadioGroup>
  );
};
