import { ProfileLayout } from "./profileLayout";
import { ProfileMainText } from "./profileMainText";
import { Box, Flex, Circle, Text } from "@chakra-ui/react";
import { useColorAssets } from "../../hooks/view/useColorAssets";
import { Dispatch, SetStateAction } from "react";
import { OverlayParts } from "../common/overlayParts";

type Props = {
  text: string | undefined;
  onClose: VoidFunction;
};
export const MyPrDisplay = (props: Props): JSX.Element => {
  return (
    <>
      <ProfileLayout fontSize={"20px"} text={"my PR"} />
      <ProfileMainText text={props.text ?? ""} />

      {/*<Flex right={-1.5} bottom={-4} pos={"absolute"}>*/}
      {/*  <Circle*/}
      {/*    size={"32px"}*/}
      {/*    bgColor={"#D9D9D9"}*/}
      {/*    cursor={"pointer"}*/}
      {/*    onClick={() => {*/}
      {/*      props.onClose();*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <Text fontSize={"28px"}>×</Text>*/}
      {/*  </Circle>*/}
      {/*</Flex>*/}
    </>
  );
};
