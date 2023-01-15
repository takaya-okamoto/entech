import { ChangeEvent, useRef } from "react";
import { Center, Flex, FlexProps, Input, Text } from "@chakra-ui/react";
import { ImageInputArea } from "./imageInputArea";
import { FieldHookConfig, useField } from "formik";

type Props = {
  fieldProps: FieldHookConfig<string> & {
    name: string;
  };
  flexProps?: FlexProps;
  isPost?: boolean;
};

export const StyledImageInput = (props: Props): JSX.Element => {
  const [field, meta, helpers] = useField<string>(props.fieldProps);
  const inputRef = useRef<HTMLInputElement>(null!);

  const onImageClick = () => {
    inputRef.current.click();
  };

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const _file = await e.target.files?.[0];
    if (!_file) return;
    const blob = new Blob([_file], { type: _file.type });
    const blobUrl = URL.createObjectURL(blob);
    helpers.setValue(blobUrl);
  };

  return (
    <Flex direction={"column"}>
      <Center
        borderWidth={"1px"}
        borderColor={"gray.100"}
        borderRadius={props.isPost ? "10px" : "full"}
        mb={".3rem"}
      >
        <ImageInputArea
          imageLink={field.value}
          onClick={onImageClick}
          isPost={props.isPost}
        />
      </Center>
      {meta.touched && meta.error && (
        <Text color={"red.500"} fontSize={"14px"}>
          {meta.error}
        </Text>
      )}
      <Input hidden ref={inputRef} type={"file"} onChange={handleInputChange} />
    </Flex>
  );
};
