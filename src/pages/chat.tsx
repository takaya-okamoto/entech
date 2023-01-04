import { Layout } from "../components/layout/layout";
import { useRecoilState } from "recoil";
import { headerState, selectedFooterState } from "../stores/recoil";
import { useEffect, useState } from "react";
import { Editor, EditorCommand, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
import { Box, Flex, Button, Divider, Text } from "@chakra-ui/react";
import { BiBold } from "react-icons/bi";
import {
  AiOutlineItalic,
  AiOutlineStrikethrough,
  AiOutlineOrderedList,
  AiOutlineUnorderedList,
} from "react-icons/ai";

const Chat = (): JSX.Element => {
  const [selectedFooter, setSelectedFooter] =
    useRecoilState<number>(selectedFooterState);
  const [headerMode, setHeaderMode] = useRecoilState(headerState);
  useEffect(() => {
    setSelectedFooter(2);
    setHeaderMode(false);
  });

  //// draft.js ///////////////////////////////////////////////////////////////
  const [editorState, setEditorState] = useState<EditorState>(null!);
  const handleEditorStyles = (editorState: EditorState) => {
    setEditorState(editorState);
  };
  const handleKeyCommand = (
    command: EditorCommand,
    editorState: EditorState
  ) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      handleEditorStyles(newState);
      return "handled";
    }
    return "not-handled";
  };
  const handleToggleClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    inlineStyle: string
  ) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };
  const handleBlockClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    blockType: string
  ) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  useEffect(() => {
    setEditorState(EditorState.createEmpty());
  }, []);
  ////////////////////////////////////////////////////////////////////////////

  return (
    <Layout>
      <Flex direction={"column"}>
        <Text>岡村 匡也</Text>
        <Flex
          borderWidth={"1px"}
          borderRadius={"5px"}
          minH={"465px"}
          maxH={"465px"}
          px={".5rem"}
          py={".5rem"}
          overflow={"hidden"}
        ></Flex>
        <Divider my={"1rem"} />
        {editorState && (
          <Flex direction={"column"}>
            <Flex gap={2}>
              <Button
                bgColor={"white"}
                borderWidth={"1px"}
                px={"none"}
                onMouseDown={(e) => handleToggleClick(e, "BOLD")}
              >
                <BiBold />
              </Button>
              <Button
                bgColor={"white"}
                borderWidth={"1px"}
                px={"none"}
                onMouseDown={(e) => handleToggleClick(e, "ITALIC")}
              >
                <AiOutlineItalic />
              </Button>
              <Button
                bgColor={"white"}
                borderWidth={"1px"}
                px={"none"}
                onMouseDown={(e) => handleToggleClick(e, "STRIKETHROUGH")}
              >
                <AiOutlineStrikethrough />
              </Button>
              <Button
                bgColor={"white"}
                borderWidth={"1px"}
                px={"none"}
                onMouseDown={(e) => handleBlockClick(e, "ordered-list-item")}
              >
                <AiOutlineOrderedList />
              </Button>
              <Button
                bgColor={"white"}
                borderWidth={"1px"}
                px={"none"}
                onMouseDown={(e) => handleBlockClick(e, "unordered-list-item")}
              >
                <AiOutlineUnorderedList />
              </Button>
            </Flex>
            <Box
              borderWidth={"1px"}
              borderRadius={"5px"}
              borderColor={"blackAlpha.400"}
              mt={"1rem"}
              px={".5rem"}
              py={".5rem"}
              minH={"100px"}
              zIndex={999}
            >
              <Editor
                placeholder={"入力してください"}
                editorState={editorState}
                onChange={setEditorState}
                handleKeyCommand={handleKeyCommand}
              />
            </Box>
          </Flex>
        )}
      </Flex>
    </Layout>
  );
};
export default Chat;
