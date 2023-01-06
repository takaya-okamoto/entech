import { Flex, Text } from "@chakra-ui/react";
import { GoogleLoginButton } from "./googleLoginButton";
import { MicrosoftLoginButton } from "./microsoftLoginButton";
import ColorAssets from "../../constants/colorAssets";
import { useFirestore } from "../../hooks/view/useFirestore";
import { useRouter } from "next/router";
import {
  getAuth,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
} from "@firebase/auth";

export const Login = (): JSX.Element => {
  const { app } = useFirestore();
  const router = useRouter();
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const microsoftProvider = new OAuthProvider("microsoft.com");

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      await router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleMicrosoftLogin = async () => {
    try {
      await signInWithPopup(auth, microsoftProvider);
      await router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Flex direction={"column"} alignItems={"center"} w={"100%"} mb={"3rem"}>
      <Text color={ColorAssets.white} fontWeight={"bold"} fontSize={"20px"}>
        entechは学生同士で
      </Text>
      <Text color={ColorAssets.white} fontWeight={"bold"} fontSize={"20px"}>
        最高のチームを作ることができます
      </Text>
      <Text
        mt={"3rem"}
        mb={"1rem"}
        fontWeight={"bold"}
        fontSize={"15px"}
        color={ColorAssets.white}
      >
        アカウント作成 / ログイン
      </Text>
      <Flex direction={"column"} gap={5} color={ColorAssets.textColor}>
        <GoogleLoginButton onClick={handleGoogleLogin} />
        <MicrosoftLoginButton onClick={handleMicrosoftLogin} />
      </Flex>
      {/*<Text*/}
      {/*  color={ColorAssets.gray}*/}
      {/*  mt={"3rem"}*/}
      {/*  mx={"3rem"}*/}
      {/*  fontSize={"14px"}*/}
      {/*  mb={"2rem"}*/}
      {/*>*/}
      {/*  登録するには、entechの利用規約とプライバシーポリシーに同意する必要があります。*/}
      {/*</Text>*/}
    </Flex>
  );
};
