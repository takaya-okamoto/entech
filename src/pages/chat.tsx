import { Layout } from "../components/layout/layout";
import { useRecoilState } from "recoil";
import { headerState, selectedFooterState } from "../stores/recoil";
import { useEffect } from "react";

const Chat = (): JSX.Element => {
  const [selectedFooter, setSelectedFooter] =
    useRecoilState<number>(selectedFooterState);
  const [headerMode, setHeaderMode] = useRecoilState(headerState);
  useEffect(() => {
    setSelectedFooter(2);
    setHeaderMode(false);
  });

  return (
    <Layout>
      <p>chat page</p>
    </Layout>
  );
};
export default Chat;
