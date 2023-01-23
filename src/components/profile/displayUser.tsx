import { useFetchFirestore } from "../../hooks/logic/useFetchFirestore";
import { fetchProfile } from "../../lib/clientSide/firestore/fetch/fetchProfile";
import { Avatar, Flex, Text, Link as ChakraLink } from "@chakra-ui/react";
import { useColorAssets } from "../../hooks/view/useColorAssets";
import Link from "next/link";
import { useSetRecoilState } from "recoil";
import { lastViewIdState, viewTypeState } from "../../stores/recoil";

type Props = {
  uid: string;
  viewerId: string;
  onClose: VoidFunction;
};

export const DisplayUser = (props: Props): JSX.Element => {
  const userData = useFetchFirestore(fetchProfile, props.uid).data;
  const colorAssets = useColorAssets();
  const setLastViewId = useSetRecoilState(lastViewIdState);
  const setViewType = useSetRecoilState(viewTypeState);

  return (
    <ChakraLink
      as={Link}
      href={`/account/profile/${props.uid}`}
      color={colorAssets.textColor}
      onClick={() => {
        setViewType("search");
        setLastViewId(props.viewerId);
        props.onClose();
      }}
      _hover={{ textDecoration: "none", color: colorAssets.entechSubBlue }}
    >
      <Flex gap={3}>
        <Avatar src={userData?.profileImage ?? ""} />
        <Text mt={".9rem"}>{userData?.name ?? ""}</Text>
      </Flex>
    </ChakraLink>
  );
};
