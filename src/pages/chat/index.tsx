import { Layout } from "../../components/layout/layout";
import { Flex } from "@chakra-ui/react";
import { ConversationPartner } from "../../components/chat/conversationPartner";
import { useRecoilState } from "recoil";
import { headerState, selectedFooterState } from "../../stores/recoil";
import { useEffect } from "react";

const Chat = (): JSX.Element => {
  const [selectedFooter, setSelectedFooter] =
    useRecoilState<number>(selectedFooterState);
  const [headerMode, setHeaderMode] = useRecoilState(headerState);
  useEffect(() => {
    setSelectedFooter(2);
    setHeaderMode(false);
  });
  return (
    <Layout>
      <Flex direction={"column"} gap={8}>
        {[...Array(3)].map((_, index) => (
          <ConversationPartner
            key={index}
            profileImage={"#"}
            name={"岡村匡也"}
            userId={"ggenoag4"}
          />
        ))}
      </Flex>
    </Layout>
  );
};
export default Chat;
