import { useRouter } from "next/router";
import { useFetchFirestore } from "../../../hooks/logic/useFetchFirestore";
import { fetchAllMyPost } from "../../../lib/clientSide/firestore/fetch/fetchAllMyPost";
import { Flex } from "@chakra-ui/react";
import { PostCard } from "../../timeLine/postCard";
import { useMyAccount } from "../../../hooks/logic/useMyAccount";
import { ProfileLayout } from "../../profile/profileLayout";

export const PostsModal = (): JSX.Element => {
  const router = useRouter();
  const { user } = useMyAccount();
  const uid =
    typeof router.query.userId === "string" ? router.query.userId : "";
  const postsData = useFetchFirestore(fetchAllMyPost, uid).data;
  const isYou = user?.uid === uid;

  return (
    <Flex direction={"column"} gap={5}>
      <ProfileLayout isBlack={true} fontSize={"20px"} text={"投稿"} />
      {postsData?.map((p, pi) => {
        return <PostCard info={p} key={pi} isEdit={isYou} isView={true} />;
      })}
    </Flex>
  );
};
