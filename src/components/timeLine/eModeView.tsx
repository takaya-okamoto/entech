import { useFetchFirestore } from "../../hooks/logic/useFetchFirestore";
import { fetchUsersByUserType } from "../../lib/clientSide/firestore/fetch/fetchUsersByUserType";
import { Flex } from "@chakra-ui/react";
import { EModeCard } from "./eModeCard";

export const EModeView = (): JSX.Element => {
  const data = useFetchFirestore(fetchUsersByUserType, "e").data;
  return (
    <Flex direction={"column"} gap={8} pt={"1rem"}>
      {data?.map((d, di) => {
        return <EModeCard key={di} user={d} />;
      })}
    </Flex>
  );
};
