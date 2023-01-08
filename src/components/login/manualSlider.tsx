import { Flex } from "@chakra-ui/react";
import { Slide1 } from "../manual/slide1";
import { Slide2 } from "../manual/slide2";
import { Login } from "./login";

type Props = {
  slideNum: number;
};

export const ManualSlider = (props: Props): JSX.Element => {
  return (
    <Flex direction={"column"}>
      {props.slideNum === 1 && <Slide1 />}
      {props.slideNum === 2 && <Slide2 />}
      {props.slideNum === 3 && <Login />}
    </Flex>
  );
};
