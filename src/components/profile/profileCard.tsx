import {
  Box,
  Flex,
  HStack,
  List,
  ListIcon,
  ListItem,
  VStack,
} from "@chakra-ui/react";
import { ProfileLayout } from "./profileLayout";
import { ProfileMainText } from "./profileMainText";
import { DisplaySeeMore } from "./displaySeeMore";
import { RxDotFilled } from "react-icons/rx";
import { AccountMainText } from "../account/accountMainText";
import { useColorAssets } from "../../hooks/view/useColorAssets";
import { Dispatch, SetStateAction } from "react";
import { useFetchFirestore } from "../../hooks/logic/useFetchFirestore";
import { fetchProfile } from "../../lib/clientSide/firestore/fetch/fetchProfile";
import { ProfileType } from "../../types/profileType";

type Props = {
  openMyPr: boolean;
  onOpen: VoidFunction;
  userData: ProfileType | null | undefined;
  setModalType: Dispatch<
    SetStateAction<
      "posts" | "followers" | "following" | "editProfile" | "selfPr"
    >
  >;
};

export const ProfileCard = (props: Props): JSX.Element => {
  const ColorAssets = useColorAssets();
  return (
    <Flex
      left={1.5}
      gap={5}
      borderWidth={"1px"}
      borderRadius={"10px"}
      h={"24rem"}
      w={"24rem"}
      bgColor={ColorAssets.entechSubBlue}
      justifyContent={"center"}
    >
      <VStack display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <HStack>
          <Box
            bgColor={ColorAssets.entechMainBlue}
            w={"200px"}
            h={"160px"}
            rounded={"10"}
            pos={"relative"}
            onClick={() => {
              props.setModalType("selfPr");
              props.onOpen();
            }}
          >
            <ProfileLayout fontSize={"20px"} text={"my PR"} />

            <ProfileMainText text={props.userData?.selfPr ?? ""} />
            <Flex right={2} bottom={1} pos={"absolute"}>
              {props.userData?.selfPr !== "" && <DisplaySeeMore />}
            </Flex>
          </Box>

          <Box
            bgColor={ColorAssets.entechMainBlue}
            w={"150px"}
            h={"160px"}
            rounded={"10"}
            pos={"relative"}
          >
            <ProfileLayout fontSize={"18px"} text={"Need Skills"} />
            <List pt={"4px"} pl={"8px"}>
              {props.userData?.requirementSkills.map((s, si) => (
                <ListItem key={si}>
                  <Flex>
                    <ListIcon as={RxDotFilled} color={ColorAssets.white} />
                    <AccountMainText text={s.name} isWhite />
                  </Flex>
                </ListItem>
              ))}
            </List>
          </Box>
        </HStack>
        <HStack>
          <Box
            bgColor={ColorAssets.entechMainBlue}
            w={"175px"}
            h={"160px"}
            rounded={"10"}
            pos={"relative"}
          >
            <ProfileLayout fontSize={"18px"} text={"en Agnose"} />
          </Box>
          <Box
            bgColor={ColorAssets.entechMainBlue}
            w={"175px"}
            h={"160px"}
            rounded={"10"}
            pos={"relative"}
          >
            <ProfileLayout fontSize={"20px"} text={"my Skills"} />
            <List pt={"4px"} pl={"8px"}>
              {props.userData?.skills.map((s, si) => (
                <ListItem key={si}>
                  <Flex>
                    <ListIcon as={RxDotFilled} color={ColorAssets.white} />
                    <AccountMainText text={s.name} isWhite />
                  </Flex>
                </ListItem>
              ))}
            </List>
          </Box>
        </HStack>
      </VStack>
    </Flex>
  );
};
