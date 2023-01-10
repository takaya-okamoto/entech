import { getAuth, signOut } from "@firebase/auth";
import { useFirebase } from "../../hooks/logic/useFirebase";
import { Button, Flex, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useColorAssets } from "../../hooks/view/useColorAssets";

const LogOut = (): JSX.Element => {
  const toast = useToast();
  const router = useRouter();
  const { app } = useFirebase();
  const auth = getAuth(app);
  const handleLogout = async () => {
    await signOut(auth);
    await router.push("/").then(() => {
      toast({
        title: "ログアウトしました。",
        position: "top",
        status: "success",
        isClosable: true,
      });
    });
  };
  return (
    <Flex direction={"column"} alignItems={"center"}>
      <Text
        fontWeight={"semibold"}
        fontSize={"18px"}
        color={useColorAssets().textColor}
        my={"4rem"}
      >
        本当にログアウトしますか？
      </Text>
      <Button
        bgColor={"white"}
        borderRadius={"5px"}
        borderWidth={"1px"}
        shadow={"md"}
        onClick={handleLogout}
      >
        ログアウトする
      </Button>
    </Flex>
  );
};
export default LogOut;
