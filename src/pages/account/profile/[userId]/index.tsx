import { useRouter } from "next/router";
import { useFetchFirestore } from "../../../../hooks/logic/useFetchFirestore";
import { fetchProfile } from "../../../../lib/clientSide/firestore/fetchProfile";
import { Avatar, Box, Flex } from "@chakra-ui/react";
import { fetchAllMyPost } from "../../../../lib/clientSide/firestore/fetchAllMyPost";
import { useEffect, useMemo } from "react";
import { UserStatus } from "../../../../components/account/userStatus";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  selectedFooterState,
  timeLineModeState,
} from "../../../../stores/recoil";
import { useMyAccount } from "../../../../hooks/logic/useMyAccount";

const Index = (): JSX.Element => {
  const router = useRouter();
  const setSelectedFooter = useSetRecoilState<number>(selectedFooterState);
  const setTimeLineMode = useSetRecoilState<string>(timeLineModeState);

  const userId = useMemo(() => {
    return typeof router.query.userId === "string" ? router.query.userId : null;
  }, [router]);
  const { user } = useMyAccount();
  const userData = useFetchFirestore(fetchProfile, userId);
  const postData = useFetchFirestore(fetchAllMyPost, userId);

  useEffect(() => {
    setSelectedFooter(3);
    setTimeLineMode("en");
  });

  console.log({ userData });
  console.log({ postData });

  return (
    <Flex direction={"column"}>
      <Flex gap={10}>
        <Box>
          <Avatar size={"xl"} src={userData.data?.profileImage ?? ""} />
        </Box>
        <Flex gap={6}>
          <UserStatus
            num={postData.data?.length ?? 0}
            text={"Posts"}
            link={"#"}
          />
          <UserStatus num={5} text={"Followers"} link={"#"} />
          <UserStatus num={30} text={"Following"} link={"#"} />
        </Flex>
      </Flex>

      <Flex></Flex>
    </Flex>
  );
};
export default Index;
