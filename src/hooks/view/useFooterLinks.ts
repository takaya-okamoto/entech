import { IconType } from "react-icons";
import { TbHome } from "react-icons/tb";
import { RiUserSearchLine } from "react-icons/ri";
import { BsChatLeftText } from "react-icons/bs";
import { MdOutlineAccountCircle } from "react-icons/md";

export type FooterLinksType = {
  name: string;
  link: string;
  icon: IconType;
};

export const useFooterLinks = (): FooterLinksType[] => {
  return [
    {
      name: "top",
      link: "",
      icon: TbHome,
    },
    {
      name: "search",
      link: "",
      icon: RiUserSearchLine,
    },
    {
      name: "chat",
      link: "",
      icon: BsChatLeftText,
    },
    {
      name: "chat",
      link: "",
      icon: MdOutlineAccountCircle,
    },
  ];
};
