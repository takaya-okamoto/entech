import { useEffect, useMemo, useState } from "react";
import {
  convertToRaw,
  Editor,
  EditorCommand,
  EditorState,
  RichUtils,
} from "draft-js";
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
import ColorAssets from "constants/colorAssets";
import { useMyAccount } from "../../hooks/logic/useMyAccount";
import { useFetchFirestore } from "../../hooks/logic/useFetchFirestore";
import { fetchProfile } from "../../lib/clientSide/firestore/fetchProfile";
import { sendMessage } from "../../lib/clientSide/realtimeDatabase/sendMessage";
import { useRouter } from "next/router";
import { writeSoloChatId } from "../../lib/clientSide/firestore/writeSoloChatId";
import { SoloChatIdType } from "../../types/soloChatIdType";
import { fetchSoloChatId } from "../../lib/clientSide/firestore/fetchSoloChatId";

export const Messages = (): JSX.Element => {
  const router = useRouter();
  const sendUid = router.query;
  const { user } = useMyAccount();
  const profile = useFetchFirestore(fetchProfile, user?.uid);
  const args = useMemo(
    () => ({
      uid: user?.uid ?? "",
      sendUid: typeof sendUid.userId === "string" ? sendUid.userId : "",
    }),
    [user, sendUid]
  );
  const soloChat = useFetchFirestore(fetchSoloChatId, args);
  const fullName = `${profile.data?.name.first} ${profile.data?.name.last}`;

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

  const handleSend = async () => {
    const uid = user?.uid;
    const sendId =
      typeof sendUid.userId === "string" ? sendUid.userId : undefined;
    if (!uid) return;
    if (!sendId) return;
    //Todo chatIdがあったらそれを使う。
    const chatId = soloChat.data?.chatId ? soloChat.data?.chatId : uid + sendId;

    const chatInfo: SoloChatIdType = {
      chatId: chatId,
      uid: uid,
      sendUid: sendId,
    };

    const _text = convertToRaw(editorState.getCurrentContent());
    const text = JSON.stringify(_text);
    const message = {
      text: text,
      uid: uid,
      iconUrl: profile.data?.profileImage,
      sendAt: Date.now(),
      fullName: fullName,
    };
    console.log(_text);
    try {
      //todo chatIdがなかったらwriteSoloChatId
      if (!soloChat.data?.chatId) {
        await writeSoloChatId(chatInfo);
      }
      await sendMessage(chatId, message);
    } catch (e) {
      console.error(e);
    }
    return;
  };

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
            <Box
              mt={"1rem"}
              ml={".3rem"}
              color={ColorAssets.textColor}
              onClick={handleSend}
              shadow={"md"}
            >
              <AiOutlineSend size={"200px"} />
            </Box>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};
