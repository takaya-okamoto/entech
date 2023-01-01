import { Flex, Text } from "@chakra-ui/react";
import { LoginPage } from "../components/login/loginPage";
import { CreateAccount } from "../components/login/createAccount";
import { useState } from "react";

const Login = (): JSX.Element => {
  const [hasAccount, setHasAccount] = useState(false);
  return (
    <Flex direction={"column"}>
      <Text>login page</Text>
      {hasAccount ? <LoginPage /> : <CreateAccount />}
    </Flex>
  );
};
export default Login;
