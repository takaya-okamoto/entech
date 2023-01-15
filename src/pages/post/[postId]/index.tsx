import { Center, Flex, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useFetchFirestore } from "../../../hooks/logic/useFetchFirestore";
import { fetchPost } from "../../../lib/clientSide/firestore/fetchPost";
import { StyledButton } from "../../../components/form/button/StyledButton";

const Index = (): JSX.Element => {
  const router = useRouter();
  const postId = router.query.postId;
  const post = useFetchFirestore(
    fetchPost,
    typeof postId === "string" ? postId : ""
  ).data;
  return (
    <Flex direction={"column"}>
      {post?.postImage && (
        <Image alt={"postImage"} src={post?.postImage} borderRadius={"10px"} />
      )}
      {post?.title && (
        <Text py={"2rem"} color={"white"} fontWeight={"semibold"}>
          「{post?.title}」
        </Text>
      )}
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
        <StyledButton onClick={() => {}} text={"話を聞いてみる"} w={"200px"} />
      </Center>
    </Flex>
  );
};
export default Index;
