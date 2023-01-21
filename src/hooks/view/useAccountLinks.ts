import { IconType } from "react-icons";
import { MdAccountCircle, MdManageAccounts } from "react-icons/md";
import { TbDoorExit } from "react-icons/tb";
import { BsFillFileEarmarkPostFill } from "react-icons/bs";
import { useMyAccount } from "../logic/useMyAccount";
import { BiMailSend } from "react-icons/bi";

type AccountLinkType = {
  link: string;
  icon: IconType;
  text: string;
};

export const useAccountLinks = (): AccountLinkType[] => {
  const { user } = useMyAccount();
  return [
    { link: "./post", icon: BsFillFileEarmarkPostFill, text: "自分の投稿" },
    { link: "./account/logOut", icon: TbDoorExit, text: "ログアウト" },
    {
      link: "./account/delete",
      icon: MdManageAccounts,
      text: "アカウント削除",
    },
    {
      link: "./Inquiry",
      icon: BiMailSend,
      text: "問い合わせ・バグ報告",
    },
  ];
};
