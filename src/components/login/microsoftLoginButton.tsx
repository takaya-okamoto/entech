import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useColorAssets } from "../../hooks/view/useColorAssets";

type Props = {
  onClick: VoidFunction;
};

export const MicrosoftLoginButton = (props: Props): JSX.Element => {
  const ColorAssets = useColorAssets();
  return (
    <Flex
      onClick={props.onClick}
      gap={3}
      ml={".2rem"}
      bgColor={ColorAssets.white}
      shadow={"md"}
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
