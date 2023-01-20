import { Box } from "@chakra-ui/react";

type Props = {
  overlay: boolean;
  isDarker?: boolean;
};

export const OverlayParts = (props: Props): JSX.Element => {
  return props.isDarker ? (
    <Box
      display={props.overlay ? "block" : "none"}
      zIndex={"1000"}
      pos="fixed"
      minW="100%"
      minH="100vh"
      left={"0"}
      top={"0"}
      bgColor="rgba(0, 0, 0, 0.1)"
    />
  ) : (
    <Box
      display={props.overlay ? "block" : "none"}
      zIndex={"1000"}
      pos="fixed"
      minW="100%"
      minH="100vh"
      left={"0"}
      top={"0"}
      bgColor="rgba(0, 0, 0, 0.3)"
    />
  );
};
