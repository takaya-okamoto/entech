import { Button, Flex, Text } from "@chakra-ui/react";
import { useMyAccount } from "../../hooks/logic/useMyAccount";

const Delete = (): JSX.Element => {
  const { user } = useMyAccount();

  return (
    <Flex direction={"column"} alignItems={"center"}>
      <Text my={"3rem"}>ほんとうにアカウントを削除しますか？</Text>
      <Button
        colorScheme={"red"}
        onClick={async () => {
          if (!user) return;
          try {
            await fetch("/api/deleteUser", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ uid: user.uid }),
            });
          } catch (e) {
            console.warn(e);
          }
        }}
      >
        削除する
      </Button>
    </Flex>
  );
};
export default Delete;
