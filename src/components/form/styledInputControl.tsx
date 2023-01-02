import { Flex, Input, Text } from "@chakra-ui/react";
import { FieldHookConfig, useField } from "formik";
import { ChangeEvent } from "react";

type Props = {
  fieldProps: FieldHookConfig<string> & {
    name: string;
  };
  placeHolder?: string;
};

export const StyledInputControl = (props: Props): JSX.Element => {
  const [field, meta, helpers] = useField(props.fieldProps);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    helpers.setValue(e.target.value);
  };

  return (
    <Flex direction={"column"}>
      <Input
        variant={"flushed"}
        focusBorderColor={"#86C8D0"}
        onClick={() => {
          helpers.setTouched(true);
        }}
        onChange={handleChange}
        value={field.value}
        placeholder={props.placeHolder}
      />
      {meta.touched && meta.error && (
        <Text color={"red.500"} fontSize={"14px"}>
          {meta.error}
        </Text>
      )}
    </Flex>
  );
};
