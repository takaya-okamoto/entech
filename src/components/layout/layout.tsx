import { Flex, Box, VStack } from "@chakra-ui/react";
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { PopUpMenuButton } from "../common/button/popUpMenuButton";
import { useRecoilValue } from "recoil";
import { selectedFooterState } from "../../stores/recoil";

interface Props {
  children: JSX.Element;
}

export const Layout = ({ children }: Props): JSX.Element => {
  const footerState = useRecoilValue(selectedFooterState);
  return (
    <Flex direction={"column"} w={"100%"}>
      <Header />
      <Box py={"5rem"} px={"2rem"}>
        {children}
      </Box>
      {footerState === 0 && <PopUpMenuButton />}
      <Footer />
    </Flex>
  );
};
