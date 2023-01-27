import { Card, CardHeader } from "@chakra-ui/card";
import {
  Avatar,
  HStack,
  VStack,
  CardBody,
  useDisclosure,
  Flex,
  Circle,
  Text,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { ProfileType } from "../../types/profileType";
import { useColorAssets } from "../../hooks/view/useColorAssets";
import { MatchingMainText } from "../account/matchingMainText";
import { ProfileCard } from "../profile/profileCard";
import { GeneralModal } from "../common/modal/generalModal";
import { MyPrDisplay } from "../profile/myPrDisplay";
import { MatchingProfileCard } from "./matchingProfileCard";
import { useFetchFirestore } from "../../hooks/logic/useFetchFirestore";
import { fetchProfile } from "../../lib/clientSide/firestore/fetch/fetchProfile";
import { useMyAccount } from "../../hooks/logic/useMyAccount";

type Props = {
  data: ProfileType | undefined;
  dataNum: number;
  selectedUsers: number;
};

export const MatchingCard = (props: Props): JSX.Element => {
  const ColorAssets = useColorAssets();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useMyAccount();
  const { data } = useFetchFirestore(fetchProfile, user?.uid);
  const userType = data?.userType ?? "e";
  return (
    <VStack pt={"1rem"} spacing={"4rem"}>
      <Flex
        bgColor={ColorAssets.entechSubBlue}
        h={"28rem"}
        w={"23rem"}
        alignItems={"center"}
        justifyContent={"center"}
        direction={"column"}
        rounded={"20"}
        ml={"1px"}
        pt={"1rem"}
      >
        <Box
          zIndex={"2000"}
          pos={"absolute"}
          top={20}
          right={29}
          pt={"20px"}
          pr={"20px"}
        >
          <HStack>
            <Text color={ColorAssets.yellow} fontSize={"30px"} pl={"12px"}>
              {props.selectedUsers}
            </Text>
            <Text color={ColorAssets.white} fontSize={"20px"} pt={"4px"}>
              / {props.dataNum}
            </Text>
          </HStack>
        </Box>
        <HStack position={"relative"}>
          <Avatar size={"xl"} src={props.data?.profileImage ?? ""} />
          <Circle
            position={"absolute"}
            size={"40px"}
            top={"65px"}
            left={"65px"}
            bgColor={ColorAssets.entechMainBlue}
          >
            {userType === "e" ? (
              <HStack spacing={"2px"} pb={"8px"} pr={"4px"}>
                <Text color={ColorAssets.yellow} fontSize={"44px"}>
                  e
                </Text>
                <Text color={ColorAssets.white} pt={"18px"}>
                  n
                </Text>
              </HStack>
            ) : (
              <HStack spacing={"2px"} pb={"8px"} pl={"2px"}>
                <Text color={ColorAssets.white} pt={"18px"}>
                  e
                </Text>
                <Text color={ColorAssets.yellow} fontSize={"44px"}>
                  n
                </Text>
              </HStack>
            )}
          </Circle>
          <Flex direction={"column"} pl={"1rem"} pt={"2rem"}>
            <MatchingMainText text={props.data?.name ?? ""} isBold />
            <Flex>
              <MatchingMainText text={props.data?.school.name ?? ""} />
              <MatchingMainText text={props.data?.school.faculty ?? ""} />
              <MatchingMainText text={props.data?.school.grade ?? ""} />
            </Flex>
          </Flex>
        </HStack>

        <MatchingProfileCard onOpen={onOpen} userData={props.data} isMatching />
      </Flex>
      <GeneralModal isCenter={true} isOpen={isOpen} onClose={onClose}>
        <MyPrDisplay text={props.data?.selfPr} onClose={onClose} />
      </GeneralModal>
    </VStack>
  );
};
