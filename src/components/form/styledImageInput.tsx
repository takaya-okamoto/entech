import { ChangeEvent, useRef, useState } from "react";
import { Center, Flex, FlexProps, Input } from "@chakra-ui/react";
import { ImageInputArea } from "./imageInputArea";
import { FieldHookConfig, useField } from "formik";

type Props = {
  fieldProps: FieldHookConfig<string> & {
    name: string;
  };
  flexProps?: FlexProps;
};

export const StyledImageInput = (props: Props): JSX.Element => {
  const [field, meta, helpers] = useField<string>(props.fieldProps);
  const inputRef = useRef<HTMLInputElement>(null!);

  const onImageClick = () => {
    inputRef.current.click();
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const blob = new Blob([file], { type: file.type });
    const blobUrl = URL.createObjectURL(blob);
    helpers.setValue(blobUrl);
  };

  return (
    <Flex>
      <Center
        borderWidth={"1px"}
        borderColor={"gray.100"}
        borderRadius={"full"}
      >
        <ImageInputArea imageLink={field.value} onClick={onImageClick} />
      </Center>
      <Input hidden ref={inputRef} type={"file"} onChange={handleInputChange} />
    </Flex>
  );
};
