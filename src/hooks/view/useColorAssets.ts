import { useRecoilState, useRecoilValue } from "recoil";
import { timeLineModeState } from "../../stores/recoil";

type ColorAssetsType = {
  entechMainBlue: string;
  entechSubBlue: string;
  yellow: string;
  white: string;
  gray: string;
  massageBg: string;
  textColor: string;
};

export const useColorAssets = (): ColorAssetsType => {
  const modeType = useRecoilValue(timeLineModeState);
  const entechMainBlue = modeType === "n" ? "#FFFFFE" : "#00929b";
  const entechSubBlue = modeType === "n" ? "#FFFFFE" : "#86C8D0";
  const yellow = "#F4E92A";
  const white = modeType === "n" ? "#00929b" : "#FFFFFE";
  const gray = "#D9D9D9";
  const massageBg = "#F7F7F7";
  const textColor = "#5e5e5e";
  return {
    entechMainBlue,
    entechSubBlue,
    yellow,
    white,
    gray,
    massageBg,
    textColor,
  };
};
