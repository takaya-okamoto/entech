import { Button, Center, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
  getAuth,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
} from "@firebase/auth";
import { app } from "../stores/firebase/firebase";
import { GoogleLoginButton } from "../components/login/googleLoginButton";
import { MicrosoftLoginButton } from "../components/login/microsoftLoginButton";
import ColorAssets from "../constants/colorAssets";

const Login = (): JSX.Element => {
  const router = useRouter();
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const microsoftProvider = new OAuthProvider("microsoft.com");

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      await router.push("./timeLine");
    } catch (error) {
      console.error(error);
    }
  };

  const handleMicrosoftLogin = async () => {
    try {
      await signInWithPopup(auth, microsoftProvider);
      await router.push("./timeLine");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Flex direction={"column"} alignItems={"center"}>
      <Text mb={"2rem"} fontWeight={"semibold"}>
        アカウント作成 / ログイン
      </Text>
      <Flex direction={"column"} gap={5}>
        <GoogleLoginButton onClick={handleGoogleLogin} />
        <MicrosoftLoginButton onClick={handleMicrosoftLogin} />
      </Flex>
      <Text color={ColorAssets.gray} mt={"3rem"}>
        登録するには、entechの利用規約とプライバシーポリシーに同意する必要があります。
      </Text>
    </Flex>
  );
};
export default Login;
