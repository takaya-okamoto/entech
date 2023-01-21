import { Box, Text, HStack, Image } from "@chakra-ui/react";
import { useColorAssets } from "../../../hooks/view/useColorAssets";

type Props = {
  timelineMode: string;
};

export const EnModeChangeButton = (props: Props): JSX.Element => {
  const ColorAssets = useColorAssets();
  console.log(props.timelineMode);
  return (
    <Box
      display={"fix"}
      alignItems={"center"}
      justifyContent={"center"}
      rounded={"full"}
    >
      {props.timelineMode === "e" ? (
        <Image
          pl={"2px"}
          src={"/svg/e.svg"}
          style={{
            clipPath: "circle(50.5%)",
          }}
        />
      ) : (
        <Image
          pl={"2px"}
          src={"/svg/n.svg"}
          style={{
            clipPath: "circle(50.5%)",
          }}
        />
      )}
    </Box>
  );
};
