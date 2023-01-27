import { ReactNode } from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/modal";
import { useColorAssets } from "../../../hooks/view/useColorAssets";

type Props = {
  children: ReactNode;
  isOpen: boolean;
  onClose: VoidFunction;
  isCenter?: boolean;
};

export const GeneralModal = (props: Props): JSX.Element => {
  const colorAssets = useColorAssets();
  return (
    <Modal
      isCentered={!!props.isCenter}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <ModalOverlay />
      <ModalContent
        mx={"1rem"}
        pb={"1rem"}
        bgColor={props.isCenter ? colorAssets.entechMainBlue : "white"}
      >
        <ModalCloseButton color={props.isCenter ? "white" : "blackAlpha.700"} />
        <ModalBody minH={"200px"}>{props.children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};
