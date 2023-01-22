import { useRouter } from "next/router";
import { useFetchFirestore } from "../../../hooks/logic/useFetchFirestore";
import { fetchFollows } from "../../../lib/clientSide/firestore/fetch/fetchFollows";
import { Flex } from "@chakra-ui/react";
import { useMyAccount } from "../../../hooks/logic/useMyAccount";
import { DisplayUser } from "../../profile/displayUser";

type Props = {
  onClose: VoidFunction;
};

export const FollowingModal = (props: Props): JSX.Element => {
  const router = useRouter();
  const uid =
    typeof router.query.userId === "string" ? router.query.userId : "";
  const followsData = useFetchFirestore(fetchFollows, uid).data;

  return (
    <Flex direction={"column"} gap={6}>
      {followsData?.following.map((f, fi) => {
        return (
          <DisplayUser
            key={fi}
            uid={f.uid}
            onClose={props.onClose}
            viewerId={uid}
          />
        );
      })}
    </Flex>
  );
};
