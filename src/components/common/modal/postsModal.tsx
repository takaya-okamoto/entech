import { useRouter } from "next/router";
import { useFetchFirestore } from "../../../hooks/logic/useFetchFirestore";
import { fetchAllMyPost } from "../../../lib/clientSide/firestore/fetchAllMyPost";
import { Flex } from "@chakra-ui/react";
import { PostCard } from "../../timeLine/postCard";
import { useMyAccount } from "../../../hooks/logic/useMyAccount";

export const PostsModal = (): JSX.Element => {
  const router = useRouter();
  const { user } = useMyAccount();
  const uid =
    typeof router.query.userId === "string" ? router.query.userId : "";
  const postsData = useFetchFirestore(fetchAllMyPost, uid).data;
  const isYou = user?.uid === uid;

  console.log({ postsData });
  return (
    <Flex direction={"column"} gap={5}>
      {postsData?.map((p, pi) => {
        return <PostCard info={p} key={pi} isEdit={isYou} isView={true} />;
      })}
    </Flex>
  );
};
