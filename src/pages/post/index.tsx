import { useFetchFirestore } from "../../hooks/logic/useFetchFirestore";
import { fetchAllMyPost } from "../../lib/clientSide/firestore/fetchAllMyPost";
import { useMyAccount } from "../../hooks/logic/useMyAccount";
import { Flex, Text, Link as ChakraLink } from "@chakra-ui/react";
import Link from "next/link";

const Index = (): JSX.Element => {
  const { user } = useMyAccount();
  const { data } = useFetchFirestore(fetchAllMyPost, user?.uid);
  console.log({ data });
  return (
    <Flex direction={"column"} gap={10}>
      <Text>自分の投稿</Text>
      {data?.map((d, di) => {
        return (
          <ChakraLink as={Link} href={`/post/create/${d.postId}`} key={di}>
            {d.title}
          </ChakraLink>
        );
      })}
    </Flex>
  );
};
export default Index;
