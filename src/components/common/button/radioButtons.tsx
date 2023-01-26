import { Radio, RadioGroup } from "@chakra-ui/radio";
import { HStack } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  radioValue: string;
  setRadioValue: Dispatch<SetStateAction<string>>;
};
export const RadioButtons = (props: Props): JSX.Element => {
  return (
    <RadioGroup onChange={props.setRadioValue} value={props.radioValue}>
      <HStack spacing={"28px"}>
        <Radio value={"3"} size={"lg"}></Radio>
        <Radio value={"2"} size={"lg"}></Radio>
        <Radio value={"1"} size={"lg"}></Radio>
      </HStack>
    </RadioGroup>
  );
};
