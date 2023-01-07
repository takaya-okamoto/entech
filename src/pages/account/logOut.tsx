import { getAuth, signOut } from "@firebase/auth";
import { useFirestore } from "../../hooks/view/useFirestore";
import { Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";

const LogOut = (): JSX.Element => {
  const router = useRouter();
  const { app } = useFirestore();
  const auth = getAuth(app);
  const handleLogout = async () => {
    await signOut(auth);
    await router.push("/");
  };
  return (
    <Flex>
      <Button onClick={handleLogout}>Logout</Button>
    </Flex>
  );
};
export default LogOut;
