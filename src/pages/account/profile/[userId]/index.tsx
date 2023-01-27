import { useRouter } from "next/router";
import { useFetchFirestore } from "../../../../hooks/logic/useFetchFirestore";
import { fetchProfile } from "../../../../lib/clientSide/firestore/fetch/fetchProfile";
import {
  Avatar,
  Box,
  Circle,
  Flex,
  HStack,
  List,
  ListIcon,
  ListItem,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { fetchAllMyPost } from "../../../../lib/clientSide/firestore/fetch/fetchAllMyPost";
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
import { AccountMainText } from "../../../../components/account/accountMainText";
import { useMyAccount } from "../../../../hooks/logic/useMyAccount";
import { AccountGeneralButton } from "../../../../components/account/accountGeneralButton";
import { GeneralModal } from "../../../../components/common/modal/generalModal";
import { BackButton } from "../../../../components/common/button/backButton";
import { fetchFollows } from "../../../../lib/clientSide/firestore/fetch/fetchFollows";
import { writeFollows } from "../../../../lib/clientSide/firestore/write/writeFollows";
import { FollowType } from "../../../../types/followType";
import { ProfileModals } from "../../../../components/common/modal/profileModals";
import { ToolOutlined } from "@ant-design/icons/lib/icons";
import { MyPrDisplay } from "../../../../components/profile/myPrDisplay";
import { ProfileType } from "../../../../types/profileType";
import { ProfileCard } from "../../../../components/profile/profileCard";

const Index = (): JSX.Element => {
  const router = useRouter();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalType, setModalType] = useState<
    "posts" | "followers" | "following" | "editProfile" | "selfPr"
  >("editProfile");

  const colorAssets = useColorAssets();
  const setSelectedFooter = useSetRecoilState<number>(selectedFooterState);
  const setTimeLineMode = useSetRecoilState<string>(timeLineModeState);
  // const useType = useRecoilValue(use);
  const lastViewId = useRecoilValue(lastViewIdState);
  const [viewType, setViewType] = useRecoilState(viewTypeState);
  const [updateProfile, setUpdateProfile] = useState(false);

  const userId = useMemo(() => {
    return typeof router.query.userId === "string" ? router.query.userId : null;
  }, [router]);
  const { user } = useMyAccount();
  const { data } = useFetchFirestore(fetchProfile, user?.uid);
  const userType = data?.userType ?? "e";
  const userData = useFetchFirestore(fetchProfile, userId).data;
  const [_userData, setUserData] = useState<ProfileType | null | undefined>(
    null
  );
  const readerData = useFetchFirestore(fetchProfile, user?.uid).data;
  const postData = useFetchFirestore(fetchAllMyPost, userId).data;
  const [userFollowsData, setUserFollowsData] = useState<
    FollowType | undefined
  >(undefined);
  const [followsData, setFollowsData] = useState<FollowType | undefined>(
    undefined
  );
  const [click, setClick] = useState<boolean>(false);
  const [openMyPr, setOpenMyPr] = useState<boolean>(false);
  const ColorAssets = useColorAssets();
  const isWriteProfile = !!readerData;
  const isFollow = useMemo(() => {
    if (!user) return false;
    return followsData?.followers.some((f) => f.uid === user.uid) ?? false;
  }, [followsData, user]);

  const isCenter = modalType === "selfPr";

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
  useEffect(() => {
    fetchProfile(userId ?? "").then((res) => {
      setUserData(res);
    });
  }, [userId, updateProfile]);

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
        {router.query.userId === user?.uid && (
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
        )}
      </Box>
      {/*<Flex direction={"column"} pt={"32px"}>*/}
      {viewType !== undefined && (
        <BackButton
          onClick={() => {
            if (viewType === "post") {
              setViewType(undefined);
              void router.push(`/post/${lastViewId}`);
            } else if (viewType === "matching") {
              setViewType(undefined);
              void router.push(`/`);
            } else {
              setViewType(undefined);
              void router.push(`/account/profile/${lastViewId}`);
            }
          }}
          needText={true}
          flexProps={{ mb: "1rem" }}
        />
      )}

      <Flex gap={10} mt={"1.5rem"} mb={"1.5rem"}>
        <Box position={"relative"}>
          <Avatar size={"2xl"} src={userData?.profileImage ?? ""} />
          <Circle
            position={"absolute"}
            size={"52px"}
            top={"88px"}
            right={"-18px"}
            bgColor={ColorAssets.entechMainBlue}
          >
            {userType === "e" ? (
              <HStack spacing={"2px"} pb={"8px"} pr={"4px"}>
                <Text color={ColorAssets.yellow} fontSize={"56px"}>
                  e
                </Text>
                <Text color={ColorAssets.white} pt={"24px"}>
                  n
                </Text>
              </HStack>
            ) : (
              <HStack spacing={"2px"} pb={"8px"} pl={"4px"}>
                <Text color={ColorAssets.white} pt={"24px"}>
                  e
                </Text>
                <Text color={ColorAssets.yellow} fontSize={"56px"}>
                  n
                </Text>
              </HStack>
            )}
          </Circle>
        </Box>
        <Box pt={"36px"} pr={"12px"}>
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
                  void onOpen();
                }}
              />
              <UserStatus
                num={followsData?.followers.length ?? 0}
                text={"Followers"}
                onClick={() => {
                  setModalType("followers");
                  void onOpen();
                }}
              />
              <UserStatus
                num={followsData?.following.length ?? 0}
                text={"Following"}
                onClick={() => {
                  setModalType("following");
                  void onOpen();
                }}
              />
            </Flex>
          </Flex>
        </Box>
      </Flex>

      <Flex gap={2} mb={".5rem"} mt={".5rem"}>
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

                  const following_ = userFollowsData?.following.filter((f) => {
                    return f.uid !== userId;
                  });
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
              void onOpen();
            }}
          />
        )}
      </Flex>

      <Flex justifyContent={"center"}>
        <ProfileCard
          setModalType={setModalType}
          userData={userData}
          openMyPr={openMyPr}
          onOpen={onOpen}
        />

        {/*/////// Modal Area ///////*/}
        <GeneralModal isCenter={isCenter} isOpen={isOpen} onClose={onClose}>
          <ProfileModals
            modalType={modalType}
            userData={userData}
            onClose={onClose}
            setUpdateProfile={setUpdateProfile}
          />
        </GeneralModal>
      </Flex>
    </>
  );
};
export default Index;
