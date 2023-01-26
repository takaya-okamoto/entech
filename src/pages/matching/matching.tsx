import { useRecoilState } from "recoil";
import { selectedFooterState, timeLineModeState } from "../../stores/recoil";
import { useEffect, useMemo } from "react";
import { Card, CardHeader } from "@chakra-ui/card";
import { useFetchFirestore } from "../../hooks/logic/useFetchFirestore";
import { fetchProfile } from "../../lib/clientSide/firestore/fetch/fetchProfile";
import { Avatar, Text } from "@chakra-ui/react";
import { useColorAssets } from "../../hooks/view/useColorAssets";
import { useRouter } from "next/router";

const Matching = (): JSX.Element => {
  const router = useRouter();
  const [selectedFooter, setSelectedFooter] =
    useRecoilState<number>(selectedFooterState);
  const [timeLineMode, setTimeLineMode] =
    useRecoilState<string>(timeLineModeState);
  const userId = useMemo(() => {
    return typeof router.query.userId === "string" ? router.query.userId : null;
  }, [router]);
  const userData = useFetchFirestore(fetchProfile, userId).data;
  useEffect(() => {
    setSelectedFooter(1);
    setTimeLineMode("en");
  });
  const ColorAssets = useColorAssets();
  return (
    <Card>
      <CardHeader>
        <Avatar size={"xl"} src={userData?.profileImage ?? ""} />
        <Text
          color={ColorAssets.textColor}
          fontWeight={"bold"}
          fontSize={"20px"}
        >
          {userData?.name ?? ""}
        </Text>
      </CardHeader>
    </Card>
  );
};
export default Matching;
