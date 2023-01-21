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
  useToast,
} from "@chakra-ui/react";
import { fetchAllMyPost } from "../../../../lib/clientSide/firestore/fetchAllMyPost";
import { useEffect, useMemo, useState } from "react";
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
import { GeneralModal } from "../../../../components/common/modal/generalModal";
import { BackButton } from "../../../../components/common/button/backButton";
import { fetchFollows } from "../../../../lib/clientSide/firestore/fetchFollows";
import { writeFollows } from "../../../../lib/clientSide/firestore/writeFollows";
import { FollowType } from "../../../../types/followType";
import { ProfileModals } from "../../../../components/common/modal/profileModals";
import { ToolOutlined } from "@ant-design/icons/lib/icons";

const Index = (): JSX.Element => {
  const router = useRouter();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalType, setModalType] = useState<
    "posts" | "followers" | "following" | "editProfile"
  >("editProfile");
  const [title, setTitle] = useState<string>("");

  const colorAssets = useColorAssets();
  const setSelectedFooter = useSetRecoilState<number>(selectedFooterState);
  const setTimeLineMode = useSetRecoilState<string>(timeLineModeState);
  const lastViewId = useRecoilValue(lastViewIdState);
  const [viewType, setViewType] = useRecoilState(viewTypeState);

  const userId = useMemo(() => {
    return typeof router.query.userId === "string" ? router.query.userId : null;
  }, [router]);
  const { user } = useMyAccount();
  const userData = useFetchFirestore(fetchProfile, userId).data;
  const readerData = useFetchFirestore(fetchProfile, user?.uid).data;
  const postData = useFetchFirestore(fetchAllMyPost, userId).data;
  const [userFollowsData, setUserFollowsData] = useState<
    FollowType | undefined
  >(undefined);
  const [followsData, setFollowsData] = useState<FollowType | undefined>(
    undefined
  );
  const [click, setClick] = useState<boolean>(false);
  const ColorAssets = useColorAssets();
  const isWriteProfile = !!readerData;
  const isFollow = useMemo(() => {
    if (!user) return false;
    return followsData?.followers.some((f) => f.uid === user.uid) ?? false;
  }, [followsData, user]);

  useEffect(() => {
    setSelectedFooter(3);
    setTimeLineMode("en");
  });
  useEffect(() => {
    if (!userId) return;
    if (!user) return;
    fetchFollows(userId).then((res) => {
      setFollowsData(res);
    });
    fetchFollows(user.uid).then((res) => {
      setUserFollowsData(res);
    });
  }, [click, userId, user]);

  return (
    <>
      <Box
        pos={"fixed"}
        top={"20"}
        right={"4"}
        _hover={{ opacity: 0.8 }}
        boxShadow={"lg"}
        onClick={() => {
          router.push("/account");
        }}
      >
        <Box
          bgColor={"#464646"}
          w={"52px"}
          h={"52px"}
          rounded={"10"}
          display={"flex"}
        >
          <Box display={"flex"} alignItems={"center"} pl={"10px"}>
            <ToolOutlined
              style={{ color: ColorAssets.yellow, fontSize: "30px" }}
            />
          </Box>
        </Box>
      </Box>
      <Flex direction={"column"} pt={"32px"}>
        {viewType !== undefined && (
          <BackButton
            onClick={() => {
              if (viewType === "post") {
                setViewType(undefined);
                void router.push(`/post/${lastViewId}`);
              } else {
                setViewType(undefined);
                void router.push(`/account/profile/${lastViewId}`);
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
              <UserStatus
                num={postData?.length ?? 0}
                text={"Posts"}
                onClick={() => {
                  setModalType("posts");
                  setTitle("投稿");
                  void onOpen();
                }}
              />
              <UserStatus
                num={followsData?.followers.length ?? 0}
                text={"Followers"}
                onClick={() => {
                  setModalType("followers");
                  setTitle("Followers");
                  void onOpen();
                }}
              />
              <UserStatus
                num={followsData?.following.length ?? 0}
                text={"Following"}
                onClick={() => {
                  setModalType("following");
                  setTitle("Following");
                  void onOpen();
                }}
              />
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
                text={isFollow ? "following" : "follow"}
                followButton={true}
                onClick={async () => {
                  if (!user) return;
                  if (!isWriteProfile)
                    return toast({
                      title: `プロフィールを登録してからフォローできるよ。`,
                      status: "info",
                      position: "top",
                      isClosable: true,
                    });
                  if (isFollow) {
                    if (!userId) return;
                    const followers_ = followsData?.followers.filter((f) => {
                      return f.uid !== user?.uid;
                    });
                    const info_ = {
                      uid: followsData?.uid ?? userId,
                      following: followsData?.following ?? [{ uid: "" }],
                      followers: followers_ ?? [{ uid: "" }],
                    };
                    const info = {
                      data: info_,
                    };
                    await writeFollows(info);
                    setClick((prev) => !prev);

                    const following_ = userFollowsData?.following.filter(
                      (f) => {
                        return f.uid !== userId;
                      }
                    );
                    const userInfo_ = {
                      uid: user.uid,
                      following: following_ ?? [],
                      followers: userFollowsData?.followers ?? [{ uid: "" }],
                    };
                    const userInfo = {
                      data: userInfo_,
                    };
                    await writeFollows(userInfo);
                  } else {
                    if (!userId) return;
                    followsData?.followers.push({
                      uid: user.uid,
                    });
                    const info_ = {
                      uid: followsData?.uid ?? userId,
                      following: followsData?.following ?? [],
                      followers: followsData?.followers ?? [{ uid: user.uid }],
                    };
                    const info = {
                      data: info_,
                    };
                    await writeFollows(info);
                    setClick((prev) => !prev);

                    userFollowsData?.following.push({
                      uid: userId,
                    });
                    const userInfo_ = {
                      uid: user.uid,
                      following: userFollowsData?.following ?? [
                        {
                          uid: userId,
                        },
                      ],
                      followers: userFollowsData?.followers ?? [],
                    };
                    const userInfo = {
                      data: userInfo_,
                    };
                    await writeFollows(userInfo);
                  }
                }}
              />
              <AccountGeneralButton
                w={"50%"}
                text={"message"}
                followButton={false}
                onClick={() => {
                  if (!isWriteProfile)
                    return toast({
                      title: `プロフィールを登録してからメッセージできるよ。`,
                      status: "info",
                      position: "top",
                      isClosable: true,
                    });
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
              onClick={() => {
                setModalType("editProfile");
                setTitle("プロフィール編集");
                void onOpen();
              }}
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

        {/*/////// Modal Area ///////*/}
        <GeneralModal title={title} isOpen={isOpen} onClose={onClose}>
          <ProfileModals
            modalType={modalType}
            userData={userData}
            onClose={onClose}
          />
        </GeneralModal>
      </Flex>
    </>
  );
};
export default Index;
