import { useRouter } from "next/router";
import { useFetchFirestore } from "../../../../hooks/logic/useFetchFirestore";
import { fetchProfile } from "../../../../lib/clientSide/firestore/fetchProfile";
import {
  Avatar,
  Box,
  Flex,
  List,
  ListIcon,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { fetchAllMyPost } from "../../../../lib/clientSide/firestore/fetchAllMyPost";
import { useEffect, useMemo } from "react";
import { UserStatus } from "../../../../components/account/userStatus";
import { useSetRecoilState } from "recoil";
import {
  selectedFooterState,
  timeLineModeState,
} from "../../../../stores/recoil";
import { useColorAssets } from "../../../../hooks/view/useColorAssets";
import { StyledFlex } from "../../../../components/account/styledFlex";
import { AccountSubTitle } from "../../../../components/account/accountSubTitle";
import { AccountMainText } from "../../../../components/account/accountMainText";
import { RxDotFilled } from "react-icons/rx";
import { useMyAccount } from "../../../../hooks/logic/useMyAccount";
import { AccountGeneralButton } from "../../../../components/account/accountGeneralButton";

const Index = (): JSX.Element => {
  const router = useRouter();
  const colorAssets = useColorAssets();
  const setSelectedFooter = useSetRecoilState<number>(selectedFooterState);
  const setTimeLineMode = useSetRecoilState<string>(timeLineModeState);

  const userId = useMemo(() => {
    return typeof router.query.userId === "string" ? router.query.userId : null;
  }, [router]);
  const userData = useFetchFirestore(fetchProfile, userId).data;
  const postData = useFetchFirestore(fetchAllMyPost, userId).data;

  const { user } = useMyAccount();

  useEffect(() => {
    setSelectedFooter(3);
    setTimeLineMode("en");
  });

  console.log({ userData });

  return (
    <Flex direction={"column"}>
      <Flex gap={10} mb={"1.5rem"}>
        <Box>
          <Avatar size={"xl"} src={userData?.profileImage ?? ""} />
        </Box>
        <Flex direction={"column"} gap={2} mt={".3rem"}>
          <Text
            color={colorAssets.textColor}
            fontWeight={"bold"}
            fontSize={"20px"}
          >
            {userData?.name ?? ""}
          </Text>
          <Flex gap={6}>
            <UserStatus num={postData?.length ?? 0} text={"Posts"} link={"#"} />
            <UserStatus num={5} text={"Followers"} link={"#"} />
            <UserStatus num={30} text={"Following"} link={"#"} />
          </Flex>
        </Flex>
      </Flex>

      <Flex gap={2} mb={".5rem"}>
        <AccountMainText text={userData?.school.name ?? ""} />
        <AccountMainText text={userData?.school.faculty ?? ""} />
        <AccountMainText text={userData?.school.grade ?? ""} />
      </Flex>

      {/*Follow, Message*/}
      <Flex mb={"2rem"} gap={5}>
        <AccountGeneralButton w={"50%"} text={"follow"} followButton={true} />
        <AccountGeneralButton w={"50%"} text={"message"} followButton={false} />
      </Flex>

      <StyledFlex
        borderColor={colorAssets.entechMainBlue}
        flexProps={{ gap: 5 }}
      >
        {/*自己紹介*/}
        <Flex direction={"column"}>
          <AccountSubTitle text={"自己紹介"} />
          <AccountMainText text={userData?.selfPr ?? ""} />
        </Flex>

        {/*スキル*/}
        <Flex direction={"column"}>
          <AccountSubTitle text={"スキル"} />
          <List>
            {userData?.skills.map((s, si) => (
              <ListItem key={si}>
                <Flex>
                  <ListIcon as={RxDotFilled} color={colorAssets.textColor} />
                  <AccountMainText text={s.name} />
                </Flex>
              </ListItem>
            ))}
          </List>
        </Flex>

        {/*求めているスキル*/}
        <Flex direction={"column"}>
          <AccountSubTitle text={"求めているスキル"} />
          <List>
            {userData?.requirementSkills.map((s, si) => (
              <ListItem key={si}>
                <Flex>
                  <ListIcon as={RxDotFilled} color={colorAssets.textColor} />
                  <AccountMainText text={s.name} />
                </Flex>
              </ListItem>
            ))}
          </List>
        </Flex>
      </StyledFlex>
    </Flex>
  );
};
export default Index;
