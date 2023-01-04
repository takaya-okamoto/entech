import { Messages } from "../../../components/chat/messages";
import { useRouter } from "next/router";

const Index = (): JSX.Element => {
  const router = useRouter();
  const id = router.query;
  return (
    <>
      <Messages />
    </>
  );
};
export default Index;
