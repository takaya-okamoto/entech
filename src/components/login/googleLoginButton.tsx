import { Box, Flex, Image, Text } from "@chakra-ui/react";
import ColorAssets from "../../constants/colorAssets";

type Props = {
  onClick: VoidFunction;
};

export const GoogleLoginButton = (props: Props): JSX.Element => {
  return (
    <Flex
      onClick={props.onClick}
      gap={3}
      bgColor={ColorAssets.white}
      borderWidth={"1px"}
      shadow={"md"}
      borderRadius={"7px"}
      px={"2rem"}
      py={".5rem"}
      transition={".3s"}
      _hover={{
        cursor: "pointer",
        borderColor: ColorAssets.entechSubBlue,
        color: ColorAssets.entechSubBlue,
      }}
    >
      <Image alt={"google-logo"} src={"/svg/google.svg"} w={"30px"} />
      <Box>
        <Text
          fontSize={"15px"}
          pt={".2rem"}
          fontWeight={"semibold"}
          color={ColorAssets.textColor}
        >
          Googleアカウントでログイン
        </Text>
      </Box>
    </Flex>
  );
};
