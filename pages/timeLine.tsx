import { Flex, Text } from "@chakra-ui/react";
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";

const TimeLine = (): JSX.Element => {
  return (
    <Flex direction={"column"}>
      <Header />
      <Text>タイムラインページ</Text>
      <Footer />
    </Flex>
  );
};
export default TimeLine;
