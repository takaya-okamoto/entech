import { Text } from "@chakra-ui/react";
import { Layout } from "../components/layout/layout";
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
    <Layout>
      <Text>Time Line</Text>
    </Layout>
  );
};
export default TimeLine;
