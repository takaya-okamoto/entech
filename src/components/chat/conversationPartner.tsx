import { Avatar, Box, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";

type Props = {
  profileImage: string | undefined;
  name: string;
  userId: string;
};

export const ConversationPartner = (props: Props): JSX.Element => {
  return (
    <Link
      href={{ pathname: "./chat/[userId]", query: { userId: props.userId } }}
    >
      <HStack>
        <Avatar boxSize={"2.8rem"} src={props.profileImage} />
        <Box>
          <Text fontSize={"20px"}>{props.name}</Text>
        </Box>
      </HStack>
    </Link>
  );
};
