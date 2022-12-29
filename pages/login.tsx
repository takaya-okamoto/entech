import { Flex } from "@chakra-ui/react";
import { LoginPage } from "./components/login/loginPage";
import { CreateAccount } from "./components/login/createAccount";
import { useMainStyle } from "./hooks/view/useMainStyle";
import { useState } from "react";

const Login = (): JSX.Element => {
  const mainStyle = useMainStyle();
  const [hasAccount, setHasAccount] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  return (
    <Flex {...mainStyle}>{hasAccount ? <LoginPage /> : <CreateAccount />}</Flex>
  );
};
export default Login;
