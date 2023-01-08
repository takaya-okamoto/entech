import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Center, Flex, FlexProps, Input } from "@chakra-ui/react";
import { ImageInputArea } from "./imageInputArea";
import { FieldHookConfig, useField } from "formik";

import { useIsMounted } from "../../hooks/logic/useIsMounted";

type Props = {
  fieldProps: FieldHookConfig<string> & {
    name: string;
  };
  setFile: (file: File | undefined) => void;
  flexProps?: FlexProps;
};

export const StyledImageInput = (props: Props): JSX.Element => {
  const [field, meta, helpers] = useField<string>(props.fieldProps);
  const inputRef = useRef<HTMLInputElement>(null!);
  const isMountedRef = useIsMounted();
  const [file, setFile] = useState<File | undefined>(undefined);

  const onImageClick = () => {
    inputRef.current.click();
  };

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const _file = await e.target.files?.[0];
    setFile(_file);
    if (!_file) return;
    const blob = new Blob([_file], { type: _file.type });
    const blobUrl = URL.createObjectURL(blob);
    helpers.setValue(blobUrl);
  };

  useEffect(() => {
    if (isMountedRef.current) {
      props.setFile(file);
    }
  }, [file, isMountedRef, props]);

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
