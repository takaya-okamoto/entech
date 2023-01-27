import {
  Box,
  Flex,
  HStack,
  List,
  ListIcon,
  ListItem,
  VStack,
} from "@chakra-ui/react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { ProfileLayout } from "../profile/profileLayout";
import { ProfileMainText } from "../profile/profileMainText";
import { DisplaySeeMore } from "../profile/displaySeeMore";
import { RxDotFilled } from "react-icons/rx";
import { AccountMainText } from "../account/accountMainText";
import { useColorAssets } from "../../hooks/view/useColorAssets";
import React, { Dispatch, SetStateAction } from "react";
import { useFetchFirestore } from "../../hooks/logic/useFetchFirestore";
import { ProfileType } from "../../types/profileType";
import { fetchAgnose } from "../../lib/clientSide/firestore/fetch/fetchAgnose";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler);

type Props = {
  openMyPr?: boolean;
  onOpen: VoidFunction;
  userData: ProfileType | null | undefined;
  isMatching?: boolean;
  setModalType?: Dispatch<
    SetStateAction<
      "posts" | "followers" | "following" | "editProfile" | "selfPr"
    >
  >;
};

export const MatchingProfileCard = (props: Props): JSX.Element => {
  const ColorAssets = useColorAssets();
  const agnoseData = useFetchFirestore(fetchAgnose, props.userData?.id).data;

  const data = {
    labels: ["リーダーシップ", "社交性", "協調性", "主体性", "開放性"],
    datasets: [
      {
        data: [
          agnoseData?.leadership ?? 0,
          agnoseData?.sociability ?? 0,
          agnoseData?.cooperativeness ?? 0,
          agnoseData?.independence ?? 0,
          agnoseData?.openness ?? 0,
        ],
        backgroundColor: "rgba(255,227,105, .5)",
        borderColor: "rgba(18, 157, 167, 1)",
        borderWidth: 0.5,
      },
    ],
  };

  const options: {} = {
    scales: {
      r: {
        pointLabels: {
          color: "rgb(255,255,255)",
          padding: 1,
        },
        angleLines: {
          color: "rgba(255,255,255, .4)",
        },
        grid: {
          color: "rgba(255,255,255, .2)",
        },
        ticks: {
          display: false,
        },
        min: 0,
        suggestedMax: 6,
      },
    },
  };

  return (
    <Flex left={1.5} gap={5} h={"24rem"} w={"22rem"} justifyContent={"center"}>
      <VStack display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <HStack>
          <Box
            bgColor={ColorAssets.entechMainBlue}
            w={"180px"}
            h={"150px"}
            rounded={"10"}
            pos={"relative"}
            onClick={() => {
              props.setModalType && props.setModalType("selfPr");
              props.onOpen();
            }}
          >
            <ProfileLayout fontSize={"18px"} text={"my PR"} />
            <ProfileMainText text={props.userData?.selfPr ?? ""} isMatching />
            <Flex right={2} bottom={1} pos={"absolute"}>
              {props.userData?.selfPr !== "" && <DisplaySeeMore />}
            </Flex>
          </Box>

          <Box
            bgColor={ColorAssets.entechMainBlue}
            w={"130px"}
            h={"150px"}
            rounded={"10"}
            pos={"relative"}
            overflow={"scroll"}
          >
            <ProfileLayout fontSize={"16px"} text={"Need Skills"} />
            <List pt={"4px"} pl={"8px"}>
              {props.userData?.requirementSkills.map((s, si) => (
                <ListItem key={si}>
                  <Flex>
                    <ListIcon as={RxDotFilled} color={ColorAssets.white} />
                    <AccountMainText text={s.name} isWhite isMatching />
                  </Flex>
                </ListItem>
              ))}
            </List>
          </Box>
        </HStack>
        <HStack>
          <Box
            bgColor={ColorAssets.entechMainBlue}
            w={"155px"}
            h={"150px"}
            rounded={"10"}
            pos={"relative"}
          >
            <ProfileLayout fontSize={"16px"} text={"en Agnose"} />
            <Box borderRadius={"10px"} w={"88%"} pl={"1rem"}>
              <Radar data={data} options={options} />
            </Box>
          </Box>
          <Box
            bgColor={ColorAssets.entechMainBlue}
            w={"155px"}
            h={"150px"}
            rounded={"10"}
            pos={"relative"}
            overflow={"scroll"}
          >
            <ProfileLayout fontSize={"18px"} text={"my Skills"} />
            <List pt={"4px"} pl={"8px"} overflow={"scroll"}>
              {props.userData?.skills.map((s, si) => (
                <ListItem key={si}>
                  <Flex>
                    <ListIcon as={RxDotFilled} color={ColorAssets.white} />
                    <AccountMainText text={s.name} isWhite isMatching />
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
