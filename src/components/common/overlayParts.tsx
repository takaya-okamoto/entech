import { Box } from "@chakra-ui/react";

type Props = {
  isShown: boolean;
};

export const OverlayBackground = (props: Props): JSX.Element => {
  return (
    <Box
      display={props.isShown ? "block" : "none"}
      pos="fixed"
      minW="100%"
      minH="100vh"
      left={"0"}
      top={"0"}
      bgColor="rgba(0, 0, 0, 0.5)"
    />
  );
};
