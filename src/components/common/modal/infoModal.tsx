import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
} from "@chakra-ui/modal";
import { Flex, Text } from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onClose: VoidFunction;
};

export const InfoModal = (props: Props): JSX.Element => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalContent>
        <ModalHeader>ユーザータイプとは？</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction={"column"} gap={5} mb={"2rem"}>
            <Flex direction={"column"}>
              <Text fontWeight={"semibold"}>eタイプ</Text>
              <Text>e(endeavor) : 事業に参加したい人</Text>
            </Flex>
            <Flex direction={"column"}>
              <Text fontWeight={"semibold"}>nタイプ</Text>
              <Text>n(Nascent) : 技術者等を募集したい</Text>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
