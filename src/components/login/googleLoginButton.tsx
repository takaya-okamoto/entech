import { Box, Flex, Image, Text } from "@chakra-ui/react";

type Props = {
  onClick: VoidFunction;
};

export const GoogleLoginButton = (props: Props): JSX.Element => {
  return (
    <Flex
      onClick={props.onClick}
      gap={3}
      borderWidth={"1px"}
      px={"2rem"}
      py={".3rem"}
    >
      <Image alt={"google-logo"} src={"/svg/google.svg"} w={"30px"} />
      <Box>
        <Text fontSize={"16px"}>Googleアカウントでログイン</Text>
      </Box>
    </Flex>
  );
};
