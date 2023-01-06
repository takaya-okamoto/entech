import { useEffect, useState } from "react";
import { Editor, EditorCommand, EditorState, RichUtils } from "draft-js";
import { Box, Button, Flex, HStack, Text } from "@chakra-ui/react";
import {
  AiOutlineItalic,
  AiOutlineLeft,
  AiOutlineOrderedList,
  AiOutlineSend,
  AiOutlineStrikethrough,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import { Message } from "./message";
import { BiBold } from "react-icons/bi";
import Link from "next/link";
import ColorAssets from "constants/useColorAssets";

export const Messages = (): JSX.Element => {
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
    <Flex direction={"column"}>
      <HStack
        gap={2}
        color={ColorAssets.textColor}
        mb={".5rem"}
        fontSize={"18px"}
      >
        <Link href={"./"}>
          <AiOutlineLeft />
        </Link>
        <Text fontWeight={"semibold"}>岡村 匡也</Text>
      </HStack>
      <Flex
        direction={"column"}
        borderWidth={"1px"}
        gap={5}
        borderRadius={"5px"}
        minH={"465px"}
        maxH={"465px"}
        px={".5rem"}
        py={".5rem"}
        overflow={"scroll"}
      >
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
      </Flex>
      {/*<Divider my={"1rem"} />*/}
      {editorState && (
        <Flex direction={"column"} mt={"1rem"}>
          <Flex gap={2}>
            <Button
              bgColor={ColorAssets.white}
              borderWidth={"1px"}
              px={"none"}
              onMouseDown={(e) => handleToggleClick(e, "BOLD")}
            >
              <BiBold />
            </Button>
            <Button
              bgColor={ColorAssets.white}
              borderWidth={"1px"}
              px={"none"}
              onMouseDown={(e) => handleToggleClick(e, "ITALIC")}
            >
              <AiOutlineItalic />
            </Button>
            <Button
              bgColor={ColorAssets.white}
              borderWidth={"1px"}
              px={"none"}
              onMouseDown={(e) => handleToggleClick(e, "STRIKETHROUGH")}
            >
              <AiOutlineStrikethrough />
            </Button>
            <Button
              bgColor={ColorAssets.white}
              borderWidth={"1px"}
              px={"none"}
              onMouseDown={(e) => handleBlockClick(e, "ordered-list-item")}
            >
              <AiOutlineOrderedList />
            </Button>
            <Button
              bgColor={ColorAssets.white}
              borderWidth={"1px"}
              px={"none"}
              onMouseDown={(e) => handleBlockClick(e, "unordered-list-item")}
            >
              <AiOutlineUnorderedList />
            </Button>
          </Flex>
          <Flex>
            <Box
              borderWidth={"1px"}
              borderRadius={"5px"}
              borderColor={"blackAlpha.400"}
              mt={"1rem"}
              px={"1.5rem"}
              pt={".5rem"}
              minH={"100px"}
              maxH={"100px"}
              overflow={"auto"}
              zIndex={0}
              w={"100%"}
            >
              <Editor
                editorState={editorState}
                onChange={setEditorState}
                handleKeyCommand={handleKeyCommand}
              />
            </Box>
            <Box mt={"1rem"} ml={".3rem"} color={ColorAssets.textColor}>
              <AiOutlineSend size={"20px"} />
            </Box>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};
