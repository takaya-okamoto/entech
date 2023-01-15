import { useFetchFirestore } from "../../hooks/logic/useFetchFirestore";
import { fetchAllMyPost } from "../../lib/clientSide/firestore/fetchAllMyPost";
import { useMyAccount } from "../../hooks/logic/useMyAccount";
import { Flex } from "@chakra-ui/react";
import { PostCard } from "../../components/timeLine/postCard";

const Index = (): JSX.Element => {
  const { user } = useMyAccount();
  const { data } = useFetchFirestore(fetchAllMyPost, user?.uid);

  return (
    <Flex direction={"column"} gap={10}>
      {data?.map((d, di) => {
        return <PostCard info={d} key={di} isEdit={true} />;
      })}
    </Flex>
  );
};
export default Index;
