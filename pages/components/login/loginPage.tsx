import { useMainStyle } from "../../hooks/view/useMainStyle";
import { Flex } from "@chakra-ui/react";

export const LoginPage = (): JSX.Element => {
  const mainStyle = useMainStyle();
  return (
    <Flex {...mainStyle}>
      Login Page. ログインしたらタイムラインページに飛ばす。
    </Flex>
  );
};
