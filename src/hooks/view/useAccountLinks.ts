import { IconType } from "react-icons";
import { MdAccountCircle, MdManageAccounts } from "react-icons/md";
import { TbDoorExit } from "react-icons/tb";
import { BsFillFileEarmarkPostFill } from "react-icons/bs";
import { useMyAccount } from "../logic/useMyAccount";

type AccountLinkType = {
  link: string;
  icon: IconType;
  text: string;
};

export const useAccountLinks = (): AccountLinkType[] => {
  const { user } = useMyAccount();
  return [
    {
      link: `./account/profile/${user?.uid ?? ""}`,
      icon: MdAccountCircle,
      text: "プロフィール",
    },
    { link: "./post", icon: BsFillFileEarmarkPostFill, text: "自分の投稿" },
    { link: "./account/logOut", icon: TbDoorExit, text: "ログアウト" },
    {
      link: "./account/delete",
      icon: MdManageAccounts,
      text: "アカウント削除",
    },
  ];
};
