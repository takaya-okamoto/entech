import { Flex } from "@chakra-ui/react";
import { ConversationPartner } from "../../components/chat/conversationPartner";
import { useRecoilState } from "recoil";
import { selectedFooterState, timeLineModeState } from "../../stores/recoil";
import { useEffect } from "react";

const Chat = (): JSX.Element => {
  const [selectedFooter, setSelectedFooter] =
    useRecoilState<number>(selectedFooterState);
  // const [timeLineMode, setTimeLineMode] =
  //   useRecoilState<string>(timeLineModeState);
  useEffect(() => {
    setSelectedFooter(2);
    // console.log(timeLineMode);
  });
  return (
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
  );
};
export default Chat;
