import { useRouter } from "next/router";
import { useFetchFirestore } from "../../../hooks/logic/useFetchFirestore";
import { fetchFollows } from "../../../lib/clientSide/firestore/fetch/fetchFollows";
import { Flex } from "@chakra-ui/react";
import { DisplayUser } from "../../profile/displayUser";
import { ProfileLayout } from "../../profile/profileLayout";

type Props = {
  onClose: VoidFunction;
};

export const FollowersModal = (props: Props): JSX.Element => {
  const router = useRouter();
  const uid =
    typeof router.query.userId === "string" ? router.query.userId : "";
  const followsData = useFetchFirestore(fetchFollows, uid).data;
  return (
    <Flex direction={"column"} gap={6}>
      <ProfileLayout isBlack={true} fontSize={"20px"} text={"Followers"} />
      {followsData?.followers.map((f, fi) => {
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
