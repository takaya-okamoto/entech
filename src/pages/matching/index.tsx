import { useRecoilState } from "recoil";
import { selectedFooterState, timeLineModeState } from "../../stores/recoil";
import React, { useEffect, useMemo, useState } from "react";
import { Card, CardHeader } from "@chakra-ui/card";
import { useFetchFirestore } from "../../hooks/logic/useFetchFirestore";
import { fetchProfile } from "../../lib/clientSide/firestore/fetch/fetchProfile";
import { VStack, Circle, HStack } from "@chakra-ui/react";
import { useColorAssets } from "../../hooks/view/useColorAssets";
import { useRouter } from "next/router";
import { useMyAccount } from "../../hooks/logic/useMyAccount";
import { ProfileType } from "../../types/profileType";
import { fetchUsersWhoAppliesToRequirementSkills } from "../../lib/clientSide/firestore/fetch/fetchUsersWhoAppliesToRequirementSkills";
import { MatchingCard } from "../../components/matching/matchingCard";
import { BsChatDotsFill } from "react-icons/bs";
import { TbPlayerTrackNext } from "react-icons/tb";

const Index = (): JSX.Element => {
  const router = useRouter();
  const [selectedFooter, setSelectedFooter] =
    useRecoilState<number>(selectedFooterState);
  const [timeLineMode, setTimeLineMode] =
    useRecoilState<string>(timeLineModeState);
  const [selectedUsers, setSelectedUsers] = useState<number>(0);
  const userId = useMemo(() => {
    return typeof router.query.userId === "string" ? router.query.userId : null;
  }, [router]);
  const userData = useFetchFirestore(fetchProfile, userId).data;
  useEffect(() => {
    setSelectedFooter(1);
    setTimeLineMode("en");
  });
  const ColorAssets = useColorAssets();

  const { user } = useMyAccount();
  const uid = useMemo(() => {
    return user?.uid ?? "";
  }, [user]);
  const profile = useFetchFirestore(fetchProfile, uid).data;

  const [data, setData] = useState<ProfileType[] | undefined>(undefined);
  useEffect(() => {
    if (!profile) return;
    fetchUsersWhoAppliesToRequirementSkills(profile.skills).then((res) => {
      setData(res);
    });
  }, [profile]);

  console.log({ data });
  if (!data) return <></>;
  if (!data[selectedUsers + 1]) setSelectedUsers(0);
  return (
    <VStack spacing={"20px"}>
      {data[selectedUsers] && data[selectedUsers].id !== user?.uid && (
        <MatchingCard
          data={data[selectedUsers]}
          dataNum={data.length - 1}
          selectedUsers={selectedUsers + 1}
        />
      )}
      <HStack spacing={"4rem"}>
        <Circle
          size={"4.5rem"}
          bgColor={ColorAssets.textColor}
          onClick={() => setSelectedUsers((prev) => prev + 1)}
          cursor="pointer"
        >
          <TbPlayerTrackNext color={ColorAssets.white} size={"28px"} />
        </Circle>
        <Circle
          size={"5rem"}
          bgColor={ColorAssets.entechMainBlue}
          borderColor={ColorAssets.yellow}
          borderWidth={"1px"}
          onClick={() => router.push(`/chat/${data[selectedUsers]?.id ?? ""}`)}
          cursor="pointer"
        >
          <BsChatDotsFill size={"36px"} color={ColorAssets.white} />
        </Circle>
      </HStack>
    </VStack>
  );
};
export default Index;
