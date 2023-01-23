import { Avatar, Box, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { SoloChatIdType } from "../../types/soloChatIdType";
import { useMyAccount } from "../../hooks/logic/useMyAccount";
import { useEffect, useState } from "react";
import { ProfileType } from "../../types/profileType";
import { fetchProfile } from "../../lib/clientSide/firestore/fetch/fetchProfile";

type Props = {
  user: SoloChatIdType;
};

export const ConversationPartner = (props: Props): JSX.Element => {
  const { user } = useMyAccount();
  const uid =
    props.user.uid !== user?.uid ? props.user?.uid : props.user.sendUid;
  const [userData, setUserData] = useState<ProfileType | undefined>(undefined);
  useEffect(() => {
    fetchProfile(uid).then((res) => {
      setUserData(res);
    });
  }, [uid]);

  return (
    <Link href={{ pathname: "./chat/[userId]", query: { userId: uid } }}>
      <HStack>
        <Avatar boxSize={"2.8rem"} src={userData?.profileImage ?? ""} />
        <Box>
          <Text fontSize={"20px"}>{userData?.name ?? ""}</Text>
        </Box>
      </HStack>
    </Link>
  );
};
