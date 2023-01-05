import * as Yup from "yup";
import { Flex, useDisclosure, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { Formik, FormikProps } from "formik";
import { AiOutlineInfoCircle } from "react-icons/ai";

import { headerState, selectedFooterState } from "../stores/recoil";
import { Layout } from "../components/layout/layout";
import { StyledInputControl } from "../components/form/styledInputControl";
import { FormLabel } from "../components/form/formLabel";
import { StyledSubmitButton } from "../components/form/styledSubmitButton";
import { StyledSelectControl } from "../components/form/styledSelectControl";
import { StyledTextArea } from "../components/form/styledTextArea";
import { InfoModal } from "../components/common/modal/infoModal";
import { StyledImageInput } from "../components/form/styledImageInput";

const Profile = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedFooter, setSelectedFooter] =
    useRecoilState<number>(selectedFooterState);
  const [headerMode, setHeaderMode] = useRecoilState(headerState);
  useEffect(() => {
    setSelectedFooter(3);
    setHeaderMode(false);
  });
  const initialValues = {
    profileImage: "svg/noImage.svg",
    name: {
      first: "",
      last: "",
    },
    school: {
      name: "",
      faculty: "",
      grade: "",
    },
    userType: "e",
    selfPr: "",
  };
  const profileSchema = Yup.object({
    name: Yup.object({
      first: Yup.string().required("苗字を入力してください"),
      last: Yup.string().required("氏名を入力してください"),
    }),
    school: Yup.object({
      name: Yup.string().required("学校名を入力してください"),
      faculty: Yup.string().required("学部を入力してください"),
      grade: Yup.string().required("学年を選択してください"),
    }),
    userType: Yup.string(),
    selfPr: Yup.string(),
  });
  const handleSubmit = async (
    submittedValues: typeof initialValues
  ): Promise<void> => {
    await console.warn(submittedValues);
  };

  return (
    <Layout>
      <Flex>
        <Formik
          initialValues={initialValues}
          validationSchema={profileSchema}
          onSubmit={handleSubmit}
        >
          {(formikProps: FormikProps<typeof initialValues>): JSX.Element => {
            return (
              <Flex
                as={"form"}
                onSubmit={formikProps.handleSubmit as never}
                direction={"column"}
              >
                <VStack mb={"2rem"}>
                  <StyledImageInput fieldProps={{ name: "profileImage" }} />
                </VStack>

                <FormLabel label={"氏名"} />
                <Flex gap={3} pb={"2rem"}>
                  <StyledInputControl
                    fieldProps={{ name: "name.first" }}
                    placeHolder={"岡村"}
                  />
                  <StyledInputControl
                    fieldProps={{ name: "name.last" }}
                    placeHolder={"匡也"}
                  />
                </Flex>

                <FormLabel label={"学校"} />
                <Flex gap={3} pb={"2rem"}>
                  <StyledInputControl
                    fieldProps={{ name: "school.name" }}
                    placeHolder={"開志専門職大学"}
                    w={"40%"}
                  />
                  <StyledInputControl
                    fieldProps={{ name: "school.faculty" }}
                    placeHolder={"情報学部"}
                    w={"30%"}
                  />
                  <StyledSelectControl
                    fieldProps={{ name: "school.grade" }}
                    placeHolder={"学年"}
                    w={"30%"}
                    option={["1年", "2年", "3年", "4年"]}
                  />
                </Flex>

                <Flex mb={".3rem"} gap={5}>
                  <FormLabel label={"ユーザータイプ"} />
                  <AiOutlineInfoCircle
                    onClick={onOpen}
                    color={"#5d5d5d"}
                    fontSize={"23px"}
                  />
                  <InfoModal isOpen={isOpen} onClose={onClose} />
                </Flex>
                <StyledSelectControl
                  fieldProps={{ name: "userType" }}
                  option={["e", "n"]}
                  flexProps={{ mb: "2rem" }}
                />

                <FormLabel label={"自己PR"} />
                <StyledTextArea fieldProps={{ name: "selfPr" }} />

                <VStack mt={"3rem"}>
                  <StyledSubmitButton text={"保存する"} w={"10rem"} />
                </VStack>
              </Flex>
            );
          }}
        </Formik>
      </Flex>
    </Layout>
  );
};
export default Profile;
