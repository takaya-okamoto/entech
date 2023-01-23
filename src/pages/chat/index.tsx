import { Flex, Text } from "@chakra-ui/react";
import { ConversationPartner } from "../../components/chat/conversationPartner";
import { useSetRecoilState } from "recoil";
import { selectedFooterState, timeLineModeState } from "../../stores/recoil";
import { useEffect, useMemo } from "react";
import { useFetchFirestore } from "../../hooks/logic/useFetchFirestore";
import { fetchChatUsers } from "../../lib/clientSide/firestore/fetch/fetchChatUsers";
import { useMyAccount } from "../../hooks/logic/useMyAccount";

const Chat = (): JSX.Element => {
  const setSelectedFooter = useSetRecoilState<number>(selectedFooterState);
  const setTimeLineMode = useSetRecoilState<string>(timeLineModeState);
  const { user } = useMyAccount();
  const uid = useMemo(() => {
    return user?.uid ?? "";
  }, [user]);

  const info1 = useMemo(() => {
    return {
      uid: uid ?? "",
      path: "uid",
    };
  }, [uid]);
  const info2 = useMemo(() => {
    return {
      uid: uid ?? "",
      path: "sendUid",
    };
  }, [uid]);

  const chat1 = useFetchFirestore(fetchChatUsers, info1).data ?? [];
  const chat2 = useFetchFirestore(fetchChatUsers, info2).data ?? [];
  const chatUsers = chat1.concat(chat2);

  useEffect(() => {
    setSelectedFooter(2);
    setTimeLineMode("en");
  });

  if (chatUsers.length === 0)
    return <Text>友達のプロフィールからメッセージをしてみよう！</Text>;

  return (
    <Flex direction={"column"} gap={8}>
      {chatUsers.map((user, index) => (
        <ConversationPartner key={index} user={user} />
      ))}
    </Flex>
  );
};
export default Chat;
