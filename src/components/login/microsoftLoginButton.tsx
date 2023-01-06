import { Box, Flex, Image, Text } from "@chakra-ui/react";

type Props = {
  onClick: VoidFunction;
};

export const MicrosoftLoginButton = (props: Props): JSX.Element => {
  return (
    <Flex onClick={props.onClick} gap={3} ml={".2rem"}>
      <Image
        alt={"microsoft-logo"}
        src={"/svg/microsoft-logo.webp"}
        w={"25px"}
      />
      <Box>
        <Text>Microsoftアカウントでログイン</Text>
      </Box>
    </Flex>
  );
};
