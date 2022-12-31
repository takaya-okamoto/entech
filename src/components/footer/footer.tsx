import { Box, Flex, Text } from "@chakra-ui/react";
import { useFooterLinks } from "../../hooks/view/useFooterLinks";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { selectedFooterState } from "../../stores/recoil";

export const Footer = (): JSX.Element => {
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
        <Link href={item.link} key={index}>
          <Box
            w={"100%"}
            p={".4rem"}
            onClick={() => {
              setSelectedFooter(index);
            }}
          >
            <Text
              fontSize={"36px"}
              color={index === selectedFooter ? "#86C8D0" : "gray.400"}
              _hover={{ color: "#86C8D0" }}
            >
              <item.icon />
            </Text>
          </Box>
        </Link>
      ))}
    </Flex>
  );
};
