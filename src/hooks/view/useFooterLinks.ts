import { IconType } from "react-icons";
import { TbHome } from "react-icons/tb";
import { HiOutlineUsers, HiOutlineChatAlt2 } from "react-icons/hi";
import { BsChatLeftText } from "react-icons/bs";
import { MdOutlineAccountCircle } from "react-icons/md";
import { useMyAccount } from "../logic/useMyAccount";
import { AiFillWechat } from "react-icons/ai";

export type FooterLinksType = {
  name: string;
  link: string;
  icon: IconType;
};

export const useFooterLinks = (): FooterLinksType[] => {
  const { user } = useMyAccount();
  return [
    {
      name: "Home",
      link: "/",
      icon: TbHome,
    },
    {
      name: "Marching",
      link: "/matching",
      icon: HiOutlineUsers,
    },
    {
      name: "Chat",
      link: "/chat",
      icon: HiOutlineChatAlt2,
    },
    {
      name: "Account",
      link: `/account/profile/${user?.uid ?? ""}`,
      icon: MdOutlineAccountCircle,
    },
  ];
};
