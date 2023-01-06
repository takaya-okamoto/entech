import * as Yup from "yup";
import { Flex, useDisclosure, VStack } from "@chakra-ui/react";
import { FieldArray, Formik, FormikProps } from "formik";
import { AiOutlineInfoCircle } from "react-icons/ai";

import { StyledInputControl } from "../../components/form/styledInputControl";
import { FormLabel } from "../../components/form/formLabel";
import { StyledSubmitButton } from "../../components/form/button/styledSubmitButton";
import { StyledSelectControl } from "../../components/form/styledSelectControl";
import { StyledTextArea } from "../../components/form/styledTextArea";
import { InfoModal } from "../../components/common/modal/infoModal";
import { StyledImageInput } from "../../components/form/styledImageInput";
import { useSkills } from "../../hooks/view/useSkills";
import { DeleteButton } from "../../components/form/button/deleteButton";
import { StyledButton } from "../../components/form/button/StyledButton";

const Profile = (): JSX.Element => {
  const skills = useSkills();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialValues = {
    profileImage: "../svg/noImage.svg",
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
    skills: [{ name: "" }],
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
    <Flex justifyContent={"center"}>
      <Formik
        initialValues={initialValues}
        validationSchema={profileSchema}
        onSubmit={handleSubmit}
        enableReinitialize
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

              <FormLabel label={"スキル"} />
              <FieldArray
                name={"skills"}
                render={({ remove, push }): JSX.Element => (
                  <Flex direction={"column"} gap={5}>
                    {formikProps.values.skills.map((skill, index) => {
                      return (
                        <Flex key={index} gap={5}>
                          <StyledSelectControl
                            fieldProps={{ name: `skills.${index}.name` }}
                            option={skills}
                            flexProps={{ mr: "1rem" }}
                            selectProps={{ w: "250px" }}
                          />
                          <DeleteButton
                            onClick={() => {
                              remove(index);
                            }}
                          />
                        </Flex>
                      );
                    })}
                    <StyledButton
                      onClick={(e) => {
                        e.preventDefault();
                        push({ name: "" });
                      }}
                      text={"追加"}
                    />
                  </Flex>
                )}
              />

              <FormLabel label={"自己PR"} textProps={{ mt: "2rem" }} />
              <StyledTextArea fieldProps={{ name: "selfPr" }} />

              <VStack mt={"3rem"}>
                <StyledSubmitButton text={"保存する"} w={"10rem"} />
              </VStack>
            </Flex>
          );
        }}
      </Formik>
    </Flex>
  );
};
export default Profile;
