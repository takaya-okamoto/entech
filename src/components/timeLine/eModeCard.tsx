import { ProfileType } from "../../types/profileType";
import { Avatar, Flex, Text } from "@chakra-ui/react";
import { useColorAssets } from "../../hooks/view/useColorAssets";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { lastViewIdState, viewTypeState } from "../../stores/recoil";

type Props = {
  user: ProfileType;
};

export const EModeCard = (props: Props): JSX.Element => {
  const colorAssets = useColorAssets();
  const router = useRouter();
  const setLastViewId = useSetRecoilState(lastViewIdState);
  const setViewType = useSetRecoilState(viewTypeState);

  return (
    <Flex
      borderWidth={"1px"}
      borderX={"none"}
      borderTop={"none"}
      borderColor={colorAssets.entechSubBlue}
      px={"1rem"}
      pb={".5rem"}
      gap={8}
      color={colorAssets.textColor}
      transition={".3s"}
      _hover={{ transform: "scale(1.03)" }}
      onClick={() => {
        setViewType("matching");
        setLastViewId(props.user.id);
        void router.push(`account/profile/${props.user.id}`);
      }}
    >
      <Flex direction={"column"} minW={"100px"} align={"center"}>
        <Avatar src={props.user.profileImage} size={"lg"} />
        <Text>{props.user.name}</Text>
      </Flex>
      <Text className={"profileText"}>{props.user.selfPr}</Text>
    </Flex>
  );
};
