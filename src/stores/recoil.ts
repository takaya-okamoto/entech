import { atom } from "recoil";

//header
export const timeLineModeState = atom<string>({
  key: "timeLineModeState",
  default: "e",
});
//footer
export const selectedFooterState = atom<number>({
  key: "selectedFooterState",
  default: 0,
});

export const userTypeState = atom<string>({
  key: "userTypeState",
  default: "e",
});
