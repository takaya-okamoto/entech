import { ProfileLayout } from "./profileLayout";
import { ProfileMainText } from "./profileMainText";
import { Box, Flex, Circle, Text } from "@chakra-ui/react";
import { DisplaySeeMore } from "../displaySeeMore";
import { useColorAssets } from "../../hooks/view/useColorAssets";
import { useFetchFirestore } from "../../hooks/logic/useFetchFirestore";
import { fetchProfile } from "../../lib/clientSide/firestore/fetchProfile";
import { Dispatch, SetStateAction, useMemo } from "react";
import { router } from "next/client";
import { OverlayParts } from "../common/overlayParts";

type Props = {
  setOpenMyPr: Dispatch<SetStateAction<boolean>>;
  text: string | undefined;
};
export const MyPrDisplay = (props: Props): JSX.Element => {
  const ColorAssets = useColorAssets();
  const userId = useMemo(() => {
    return typeof router.query.userId === "string" ? router.query.userId : null;
  }, [router]);
  const userData = useFetchFirestore(fetchProfile, userId).data;
  return (
    <>
      <OverlayParts overlay={true} isDarker />
      <Flex justifyContent={"center"}>
        <Box
          bgColor={ColorAssets.entechMainBlue}
          w={"360px"}
          h={"300px"}
          rounded={"10"}
          zIndex={"3000"}
          pos={"absolute"}
        >
          <ProfileLayout fontSize={"20px"} text={"my PR"} />

          <ProfileMainText text={props.text ?? ""} />
          <Flex right={-1.5} bottom={-4} pos={"absolute"}>
            <Circle
              size={"32px"}
              bgColor={"#D9D9D9"}
              _hover={{ opacity: 0.7 }}
              onClick={() => {
                props.setOpenMyPr(false);
              }}
            >
              <Text fontSize={"28px"}>×</Text>
            </Circle>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};
