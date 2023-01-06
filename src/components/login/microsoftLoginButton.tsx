import { Box, Flex, Image, Text } from "@chakra-ui/react";
import ColorAssets from "../../constants/colorAssets";

type Props = {
  onClick: VoidFunction;
};

export const MicrosoftLoginButton = (props: Props): JSX.Element => {
  return (
    <Flex
      onClick={props.onClick}
      gap={3}
      ml={".2rem"}
      borderWidth={"1px"}
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
      <Image
        alt={"microsoft-logo"}
        src={"/svg/microsoft-logo.webp"}
        w={"25px"}
      />
      <Box>
        <Text
          fontSize={"15px"}
          pt={".1rem"}
          fontWeight={"semibold"}
          color={ColorAssets.textColor}
        >
          Microsoftアカウントでログイン
        </Text>
      </Box>
    </Flex>
  );
};
