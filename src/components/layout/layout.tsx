import { Flex, Box } from "@chakra-ui/react";
import { Header } from "../header/header";
import { Footer } from "../footer/footer";

interface Props {
  children: JSX.Element;
}

export const Layout = ({ children }: Props): JSX.Element => {
  return (
    <Flex direction={"column"} w={"100%"}>
      <Header />
      <Box minH={"88vh"} px={'1rem'} py={'1.2rem'}>{children}</Box>
      <Footer />
    </Flex>
  );
};
