<<<<<<< HEAD
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
  const entechMainBlue = "#17949D";
  const entechSubBlue = "#86C8D0";
  const yellow = "#F4E92A";
  const white = modeType === "e" ? "#FFFFFE" : "#17949D";
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
=======
const ColorAssets = {
  entechMainBulue: "#17949D",
  entechSubBulue: "#86C8D0",
  yellow: "#F4E92A",
  gray: "#B4B4B4",
  white: "#FFFFFE",
};

export default ColorAssets;
>>>>>>> main
