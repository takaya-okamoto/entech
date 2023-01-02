import { Layout } from "../components/layout/layout";
import { useRecoilState } from "recoil";
import { selectedFooterState } from "../stores/recoil";
import { useEffect } from "react";

const Chat = (): JSX.Element => {
  const [selectedFooter, setSelectedFooter] =
    useRecoilState<number>(selectedFooterState);
  useEffect(() => {
    setSelectedFooter(2);
  });
  return (
    <Layout>
      <p>chat page</p>
    </Layout>
  );
};
export default Chat;
