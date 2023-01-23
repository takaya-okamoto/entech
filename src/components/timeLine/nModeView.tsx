import { useFetchFirestore } from "../../hooks/logic/useFetchFirestore";
import { fetchAllPost } from "../../lib/clientSide/firestore/fetch/fetchAllPost";
import { Flex } from "@chakra-ui/react";
import { PostCard } from "./postCard";

export const NModeView = (): JSX.Element => {
  const { data } = useFetchFirestore(fetchAllPost, "null");

  return (
    <Flex direction={"column"} gap={5}>
      {data?.map((d, di) => {
        return <PostCard info={d} key={di} />;
      })}
    </Flex>
  );
};
