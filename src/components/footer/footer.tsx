import { Flex, Text } from "@chakra-ui/react";
import { useFooterLinks } from "../../hooks/view/useFooterLinks";
import { useRecoilState } from "recoil";
import { selectedFooterState } from "../../stores/recoil";
import { useRouter } from "next/router";

export const Footer = (): JSX.Element => {
  const router = useRouter();
  const footerItems = useFooterLinks();
  const [selectedFooter, setSelectedFooter] =
    useRecoilState<number>(selectedFooterState);

  return (
    <Flex
      justifyContent={"space-between"}
      h={"6vh"}
      w={"100%"}
      px={"2rem"}
      borderTop={"1px"}
      borderColor={"gray.400"}
    >
      {footerItems.map((item, index) => (
        <Flex
          key={index}
          w={"100%"}
          py={".4rem"}
          px={"1rem"}
          onClick={() => {
            setSelectedFooter(index);
            router.push(item.link).catch((e) => {
              console.error(e);
            });
          }}
          justifyContent={"center"}
        >
          <Text
            fontSize={"36px"}
            color={index === selectedFooter ? "#86C8D0" : "gray.400"}
            _hover={{ color: "#86C8D0" }}
          >
            <item.icon />
          </Text>
        </Flex>
      ))}
    </Flex>
  );
};
