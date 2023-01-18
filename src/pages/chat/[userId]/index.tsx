import { Messages } from "../../../components/chat/messages";
import { useRouter } from "next/router";
import { useFetchFirestore } from "../../../hooks/logic/useFetchFirestore";
import { fetchProfile } from "../../../lib/clientSide/firestore/fetchProfile";
import { Text } from "@chakra-ui/react";

const Index = (): JSX.Element => {
  const router = useRouter();
  const id = router.query.userId;
  const userData = useFetchFirestore(
    fetchProfile,
    typeof id === "string" ? id : ""
  ).data;
  if (!userData) return <Text>ユーザーデータが見つかりません</Text>;
  return <Messages userData={userData} />;
};
export default Index;
