import { Flex, Box, VStack } from "@chakra-ui/react";
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { PopUpMenuButton } from "../common/button/popUpMenuButton";

interface Props {
  children: JSX.Element;
}

export const Layout = ({ children }: Props): JSX.Element => {
  return (
    <Flex direction={"column"} w={"100%"}>
      <Header />
      <Box py={"5rem"} px={"2rem"}>
        {children}
      </Box>
      <PopUpMenuButton />
      <Footer />
    </Flex>
  );
};
