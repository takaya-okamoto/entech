import { IconType } from "react-icons";
import { TbHome } from "react-icons/tb";
import { RiUserSearchLine } from "react-icons/ri";
import { BsChatLeftText } from "react-icons/bs";
import { MdOutlineAccountCircle } from "react-icons/md";
import { useMyAccount } from "../logic/useMyAccount";

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
      name: "Search",
      link: "/search",
      icon: RiUserSearchLine,
    },
    {
      name: "Chat",
      link: "/chat",
      icon: BsChatLeftText,
    },
    {
      name: "Account",
      link: `./account/profile/${user?.uid ?? ""}`,
      icon: MdOutlineAccountCircle,
    },
  ];
};
