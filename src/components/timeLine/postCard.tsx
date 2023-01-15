import { PostType } from "../../types/postType";
import Link from "next/link";
import { Flex, Image, Text } from "@chakra-ui/react";
import { Link as ChakraLink } from "@chakra-ui/layout";
import { useColorAssets } from "../../hooks/view/useColorAssets";

type Props = {
  info: PostType;
  isEdit?: boolean;
};

export const PostCard = ({ info, isEdit }: Props): JSX.Element => {
  const color = useColorAssets();
  return (
    <ChakraLink
      as={Link}
      href={isEdit ? `/post/create/${info.postId}` : `/post/${info.postId}`}
      shadow={isEdit ? "md" : "none"}
      px={".8rem"}
      py={"1.5rem"}
      borderRadius={isEdit ? "10px" : "none"}
      borderWidth={"1px"}
      borderX={"none"}
      borderTop={"none"}
      _hover={{
        textDecoration: "none",
        shadow: "sm",
      }}
    >
      <Flex gap={5}>
        <Image
          h={"80px"}
          w={"100px"}
          borderRadius={"10px"}
          src={info.postImage}
          alt={"postImage"}
        />
        <Flex direction={"column"} w={"180px"} gap={5}>
          <Text
            color={isEdit ? color.textColor : "white"}
            fontWeight={"bold"}
            whiteSpace={"nowrap"}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
          >
            {info.title}
          </Text>
          <Text
            color={isEdit ? color.textColor : "white"}
            whiteSpace={"nowrap"}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
          >
            {info.describe}
          </Text>
        </Flex>
      </Flex>
    </ChakraLink>
  );
};
