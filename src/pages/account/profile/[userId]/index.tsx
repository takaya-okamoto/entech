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
  useDisclosure,
} from "@chakra-ui/react";
import { fetchAllMyPost } from "../../../../lib/clientSide/firestore/fetchAllMyPost";
import { useEffect, useMemo } from "react";
import { UserStatus } from "../../../../components/account/userStatus";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  lastViewIdState,
  selectedFooterState,
  timeLineModeState,
  viewTypeState,
} from "../../../../stores/recoil";
import { useColorAssets } from "../../../../hooks/view/useColorAssets";
import { StyledFlex } from "../../../../components/account/styledFlex";
import { AccountSubTitle } from "../../../../components/account/accountSubTitle";
import { AccountMainText } from "../../../../components/account/accountMainText";
import { RxDotFilled } from "react-icons/rx";
import { useMyAccount } from "../../../../hooks/logic/useMyAccount";
import { AccountGeneralButton } from "../../../../components/account/accountGeneralButton";
import { EditProfileModal } from "../../../../components/common/modal/editProfileModal";
import { GeneralModal } from "../../../../components/common/modal/generalModal";
import { BackButton } from "../../../../components/common/button/backButton";

const Index = (): JSX.Element => {
  const router = useRouter();
  const colorAssets = useColorAssets();
  const setSelectedFooter = useSetRecoilState<number>(selectedFooterState);
  const setTimeLineMode = useSetRecoilState<string>(timeLineModeState);
  const lastViewId = useRecoilValue(lastViewIdState);
  const [viewType, setViewType] = useRecoilState(viewTypeState);

  const userId = useMemo(() => {
    return typeof router.query.userId === "string" ? router.query.userId : null;
  }, [router]);
  const userData = useFetchFirestore(fetchProfile, userId).data;
  const postData = useFetchFirestore(fetchAllMyPost, userId).data;

  const { user } = useMyAccount();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setSelectedFooter(3);
    setTimeLineMode("en");
  });

  console.log({ userData });
  console.log({ lastViewId });
  console.log({ viewType });

  return (
    <Flex direction={"column"}>
      {viewType !== undefined && (
        <BackButton
          onClick={() => {
            if (viewType === "post") {
              setViewType(undefined);
              void router.push(`/post/${lastViewId}`);
            } else {
              void router.push(`/`);
            }
          }}
          needText={true}
          flexProps={{ mb: "1rem" }}
        />
      )}

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

      {/*Follow, Message , EditProfileModal*/}
      <Flex mb={"2rem"} gap={5}>
        {user?.uid !== userId && (
          <>
            <AccountGeneralButton
              w={"50%"}
              text={"follow"}
              followButton={true}
            />
            <AccountGeneralButton
              w={"50%"}
              text={"message"}
              followButton={false}
              onClick={(): void => {
                void router.push(`/chat/${userId}`);
              }}
            />
          </>
        )}
        {user?.uid === userId && (
          <AccountGeneralButton
            w={"100%"}
            text={"edit profile"}
            followButton={false}
            onClick={onOpen}
          />
        )}
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

      <GeneralModal
        title={"プロフィール編集"}
        isOpen={isOpen}
        onClose={onClose}
      >
        <EditProfileModal userData={userData} />
      </GeneralModal>
    </Flex>
  );
};
export default Index;
