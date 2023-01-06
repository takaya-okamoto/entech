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
      <Text mb={"3rem"} fontWeight={"semibold"}>
        ログイン
      </Text>
      <Flex direction={"column"} gap={10}>
        <GoogleLoginButton onClick={handleGoogleLogin} />
        <MicrosoftLoginButton onClick={handleMicrosoftLogin} />
      </Flex>
    </Flex>
  );
};
export default Login;
