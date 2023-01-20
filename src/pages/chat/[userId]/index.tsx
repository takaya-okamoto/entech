import { Messages } from "../../../components/chat/messages";
import { useRouter } from "next/router";
import { useFetchFirestore } from "../../../hooks/logic/useFetchFirestore";
import { fetchProfile } from "../../../lib/clientSide/firestore/fetchProfile";
import { Text } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import { selectedFooterState, timeLineModeState } from "../../../stores/recoil";
import { useEffect } from "react";

const Index = (): JSX.Element => {
  const setSelectedFooter = useSetRecoilState<number>(selectedFooterState);
  const setTimeLineMode = useSetRecoilState<string>(timeLineModeState);

  const router = useRouter();
  const id = router.query.userId;
  const userData = useFetchFirestore(
    fetchProfile,
    typeof id === "string" ? id : ""
  ).data;

  useEffect(() => {
    setSelectedFooter(3);
    setTimeLineMode("en");
  });

  if (!userData) return <Text>ユーザーデータが見つかりません</Text>;
  return <Messages userData={userData} />;
};
export default Index;
