import { Layout } from "../../../components/layout/layout";
import { Messages } from "../../../components/chat/messages";
import { useRouter } from "next/router";

const Index = (): JSX.Element => {
  const router = useRouter();
  const id = router.query;
  return (
    <Layout>
      <Messages />
    </Layout>
  );
};
export default Index;
