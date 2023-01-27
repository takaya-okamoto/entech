import { Card, CardHeader } from "@chakra-ui/card";
import {
  Avatar,
  HStack,
  VStack,
  CardBody,
  useDisclosure,
  Flex,
  Circle,
} from "@chakra-ui/react";
import React from "react";
import { ProfileType } from "../../types/profileType";
import { useColorAssets } from "../../hooks/view/useColorAssets";
import { MatchingMainText } from "../account/matchingMainText";
import { ProfileCard } from "../profile/profileCard";
import { GeneralModal } from "../common/modal/generalModal";
import { MyPrDisplay } from "../profile/myPrDisplay";

type Props = {
  data: ProfileType | undefined;
};

export const MatchingCard = (props: Props): JSX.Element => {
  const ColorAssets = useColorAssets();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <VStack pt={"20px"} spacing={"4rem"}>
      <Flex
        bgColor={ColorAssets.entechSubBlue}
        h={"34rem"}
        w={"24rem"}
        alignItems={"center"}
        justifyContent={"center"}
        direction={"column"}
        rounded={"20"}
        ml={"1px"}
      >
        <HStack>
          <Avatar size={"xl"} src={props.data?.profileImage ?? ""} />
          <Flex direction={"column"} pl={"2rem"}>
            <MatchingMainText text={props.data?.name ?? ""} isBold />
            <Flex>
              <MatchingMainText text={props.data?.school.faculty ?? ""} />
              <MatchingMainText text={props.data?.school.name ?? ""} />
              <MatchingMainText text={props.data?.school.grade ?? ""} />
            </Flex>
          </Flex>
        </HStack>

        <ProfileCard onOpen={onOpen} userData={props.data} isMatching />
      </Flex>
      <GeneralModal isCenter={true} isOpen={isOpen} onClose={onClose}>
        <MyPrDisplay text={props.data?.selfPr} onClose={onClose} />
      </GeneralModal>
    </VStack>
  );
};
