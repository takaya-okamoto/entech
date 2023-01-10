import { Avatar, Flex, Box } from "@chakra-ui/react";
import { useColorAssets } from "hooks/view/useColorAssets";
import { MessageType } from "../../types/messageType";
import { useEffect, useState } from "react";
import { convertFromRaw, Editor, EditorState } from "draft-js";

type Props = {
  message: MessageType;
};

export const Message = (props: Props): JSX.Element => {
  const ColorAssets = useColorAssets();
  const [editorState, setEditorState] = useState<EditorState>();
  const text_ = JSON.parse(props.message.text);
  useEffect(() => {
    setEditorState(EditorState.createWithContent(convertFromRaw(text_)));
  }, []);
  if (!editorState) return <></>;

  return (
    <Flex _hover={{ bgColor: ColorAssets.massageBg }}>
      <Avatar size={"sm"} src={props.message?.iconUrl} />
      <Box ml={"2rem"} mt={".2rem"}>
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          readOnly={true}
        />
      </Box>
    </Flex>
  );
};
