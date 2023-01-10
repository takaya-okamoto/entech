import { useRecoilState } from "recoil";
import { selectedFooterState, timeLineModeState } from "../../stores/recoil";
import { useEffect } from "react";
import { Center, Flex } from "@chakra-ui/react";
import { useAccountLinks } from "../../hooks/view/useAccountLinks";
import { AccountLinkButton } from "../../components/account/accountLinkButton";

const Index = (): JSX.Element => {
  const accountLinks = useAccountLinks();
  const [selectedFooter, setSelectedFooter] =
    useRecoilState<number>(selectedFooterState);
  const [timeLinemode, setTimeLineMode] =
    useRecoilState<string>(timeLineModeState);
  useEffect(() => {
    setSelectedFooter(3);
    setTimeLineMode("en");
  });
  return (
    <Flex direction={"column"} gap={7}>
      {accountLinks.map((accountLink, index) => (
        <AccountLinkButton
          key={index}
          link={accountLink.link}
          icon={accountLink.icon}
          text={accountLink.text}
        />
      ))}
    </Flex>
  );
};
export default Index;
