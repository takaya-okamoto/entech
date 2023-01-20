import { Avatar, Center, Flex, Image, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useFetchFirestore } from "../../../hooks/logic/useFetchFirestore";
import { fetchPost } from "../../../lib/clientSide/firestore/fetchPost";
import { StyledButton } from "../../../components/form/button/StyledButton";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import {
  lastViewIdState,
  selectedFooterState,
  timeLineModeState,
  viewTypeState,
} from "../../../stores/recoil";
import { fetchProfile } from "../../../lib/clientSide/firestore/fetchProfile";
import { useMyAccount } from "../../../hooks/logic/useMyAccount";

const Index = (): JSX.Element => {
  const setTimeLineMode = useSetRecoilState<string>(timeLineModeState);
  const setLastViewId = useSetRecoilState(lastViewIdState);
  const setViewType = useSetRecoilState(viewTypeState);

  const toast = useToast();
  const { user } = useMyAccount();
  const readerData = useFetchFirestore(fetchProfile, user?.uid).data;
  const isWriteProfile = !!readerData;

  const router = useRouter();
  const postId = router.query.postId;
  const post = useFetchFirestore(
    fetchPost,
    typeof postId === "string" ? postId : ""
  ).data;
  const userData = useFetchFirestore(fetchProfile, post?.userId ?? "").data;

  useEffect(() => {
    setTimeLineMode("n");
  });

  return (
    <Flex direction={"column"}>
      {post?.postImage && (
        <Center>
          <Image
            alt={"postImage"}
            src={post?.postImage}
            borderRadius={"10px"}
            h={"150px"}
            w={"250px"}
          />
        </Center>
      )}
      {post?.title && (
        <Text pt={"2rem"} color={"white"} fontWeight={"semibold"}>
          「{post.title}」
        </Text>
      )}

      <Flex
        mb={"2rem"}
        mt={".5rem"}
        ml={"1rem"}
        gap={2}
        onClick={(): void => {
          setLastViewId(typeof postId === "string" ? postId : undefined);
          setViewType("post");
          void router.push(`/account/profile/${userData?.id ?? ""}`);
        }}
      >
        <Avatar size={"sm"} src={userData?.profileImage ?? ""} />
        <Text fontWeight={"bold"} color={"white"} mt={".5rem"}>
          {userData?.name ?? ""}
        </Text>
      </Flex>

      <Text color={"white"} fontWeight={"semibold"}>
        事業内容
      </Text>
      <Text color={"white"}>{post?.describe}</Text>
      <Text pt={"2rem"} color={"white"} fontWeight={"semibold"}>
        求めるスキル
      </Text>
      <Flex pb={"2rem"} direction={"column"}>
        {post?.requirementSkills.map((s, si) => {
          return (
            <Text key={si} color={"white"}>
              ・{s.name}
            </Text>
          );
        })}
      </Flex>
      <Center>
        <StyledButton
          onClick={() => {
            if (!isWriteProfile)
              return toast({
                title: "プロフィールを記入してから話を聞いてね。",
                status: "info",
                position: "top",
                isClosable: true,
              });
            return router.push(`/chat/${userData?.id ?? ""}`);
          }}
          text={"話を聞いてみる"}
          w={"200px"}
        />
      </Center>
    </Flex>
  );
};
export default Index;
