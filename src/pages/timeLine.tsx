import { Text } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { headerState, selectedFooterState } from "../stores/recoil";
import { useEffect } from "react";

const TimeLine = (): JSX.Element => {
  const [selectedFooter, setSelectedFooter] =
    useRecoilState<number>(selectedFooterState);
  const [headerMode, setHeaderMode] = useRecoilState(headerState);
  useEffect(() => {
    setSelectedFooter(0);
    setHeaderMode(true);
  });

  return (
    <>
      <Text>Time Line</Text>
    </>
  );
};
export default TimeLine;
