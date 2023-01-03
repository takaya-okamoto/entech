import { atom } from "recoil";

//header
export const timeLineModeState = atom<string>({
  key: "timeLineModeState",
  default: "e",
});
export const headerState = atom<boolean>({
  key: "headerState",
  default: true,
});

//footer
export const selectedFooterState = atom<number>({
  key: "selectedFooterState",
  default: 0,
});
