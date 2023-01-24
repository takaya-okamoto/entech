import { Box } from "@chakra-ui/react";

type Props = {
  overlay: boolean;
  isDarker?: boolean;
};

export const OverlayParts = (props: Props): JSX.Element => {
  return (
    <Box
      display={props.overlay ? "block" : "none"}
      zIndex={"1000"}
      pos="fixed"
      minW="100%"
      minH="100vh"
      left={"0"}
      top={"0"}
      bgColor={props.isDarker ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.3)"}
    />
  );
};
