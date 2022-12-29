import { useMainStyle } from "../../hooks/view/useMainStyle";
import { Flex } from "@chakra-ui/react";

export const CreateAccount = (): JSX.Element => {
  const mainStyle = useMainStyle();
  return (
    <Flex {...mainStyle}>
      create account. アカウントを作ったらログインページに飛ばす。
    </Flex>
  );
};
