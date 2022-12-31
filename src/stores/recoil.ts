import { atom } from "recoil";

export const selectedFooterState = atom<number>({
  key: "selectedFooterState",
  default: 0,
});
