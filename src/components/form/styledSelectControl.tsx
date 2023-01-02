import {
  Flex,
  FlexProps,
  InputProps,
  Select,
  SelectProps,
  Text,
} from "@chakra-ui/react";
import { FieldHookConfig, useField } from "formik";
import { ChangeEvent } from "react";

type Props = {
  fieldProps: FieldHookConfig<string> & {
    name: string;
  };
  option: string[];
  placeHolder?: string;
  isDisabled?: boolean;
  w?: string;
  flexProps?: FlexProps;
  selectProps?: SelectProps;
};

export const StyledSelectControl = (props: Props): JSX.Element => {
  const [field, meta, helpers] = useField(props.fieldProps);
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    helpers.setValue(e.target.value);
  };
  return (
    <Flex {...props.flexProps} direction={"column"} w={props.w}>
      <Select
        {...props.selectProps}
        onChange={handleChange}
        value={field.value}
        variant={"flushed"}
        focusBorderColor={"#86C8D0"}
        placeholder={props.placeHolder}
      >
        {props.option?.map((o, index) => {
          return <option key={index}>{o}</option>;
        })}
      </Select>
      {meta.touched && meta.error && (
        <Text color={"red.500"} fontSize={"14px"}>
          {meta.error}
        </Text>
      )}
    </Flex>
  );
};
