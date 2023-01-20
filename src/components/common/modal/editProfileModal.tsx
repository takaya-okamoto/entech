import { ProfileType } from "../../../types/profileType";
import { Flex, useDisclosure, useToast, VStack, Box } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";
import * as Yup from "yup";
import { UploadImage } from "../../../lib/clientSide/storage/uploadImage";
import { WriteProfile } from "../../../lib/clientSide/firestore/writeProfile";
import { FieldArray, Formik, FormikProps } from "formik";
import { StyledImageInput } from "../../form/styledImageInput";
import { FormLabel } from "../../form/formLabel";
import { StyledInputControl } from "../../form/styledInputControl";
import { StyledSelectControl } from "../../form/styledSelectControl";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useSkills } from "../../../hooks/view/useSkills";
import { selectedFooterState } from "../../../stores/recoil";
import { useMyAccount } from "../../../hooks/logic/useMyAccount";
import { useFetchFirestore } from "../../../hooks/logic/useFetchFirestore";
import { EnAgnoseButton } from "../button/enAgnoseButton";
import { fetchAgnose } from "../../../lib/clientSide/firestore/fetchAgnose";
import { InfoModal } from "./infoModal";
import { DeleteButton } from "../../form/button/deleteButton";
import { StyledButton } from "../../form/button/StyledButton";
import { StyledTextArea } from "../../form/styledTextArea";
import { StyledSubmitButton } from "../../form/button/styledSubmitButton";

type Props = {
  userData: ProfileType | undefined | null;
};

export const EditProfileModal = (props: Props): JSX.Element => {
  const toast = useToast();
  const setSelectedFooter = useSetRecoilState<number>(selectedFooterState);
  const { user } = useMyAccount();

  const skills = useSkills();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const agnose = useFetchFirestore(fetchAgnose, user?.uid).data;

  useEffect(() => {
    setSelectedFooter(3);
  });

  const initialValues = {
    profileImage: props.userData?.profileImage ?? "",
    name: props.userData?.name ?? "",
    school: {
      name: props.userData?.school.name ?? "",
      faculty: props.userData?.school.faculty ?? "",
      grade: props.userData?.school.grade ?? "",
    },
    userType: props.userData?.userType ?? "e",
    skills: props.userData?.skills ?? [{ name: "" }],
    requirementSkills: props.userData?.requirementSkills ?? [{ name: "" }],
    selfPr: props.userData?.selfPr ?? "",
  };
  const profileSchema = Yup.object({
    profileImage: Yup.string().required("画像を選択してください。"),
    name: Yup.string().required("名前を入力してください。"),
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
    if (!user) return;
    const id = props.userData?.id ?? user.uid;
    await UploadImage(`profiles/${id}`, submittedValues.profileImage).then(
      (res) => {
        submittedValues.profileImage = res;
      }
    );
    const info: ProfileType = {
      id,
      ...submittedValues,
    };
    try {
      await WriteProfile(info);
      toast({
        title: "プロフィールを保存しました。",
        status: "success",
        position: "top",
        isClosable: true,
      });
    } catch (e) {
      console.error(e);
      toast({
        title: "プロフィールの保存に失敗しました。",
        status: "success",
        position: "top",
        isClosable: true,
      });
    }
  };
  return (
    <Flex justifyContent={"center"} pb={"3rem"}>
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
              {agnose ? (
                <Box mb={"2rem"}>
                  <StyledImageInput fieldProps={{ name: "profileImage" }} />
                </Box>
              ) : (
                <Flex gap={2}>
                  <Box mb={"2rem"}>
                    <StyledImageInput fieldProps={{ name: "profileImage" }} />
                  </Box>
                  <Box mt={".5rem"}>
                    <EnAgnoseButton />
                  </Box>
                </Flex>
              )}
              <FormLabel label={"ユーザーネーム"} />
              <Flex gap={3} pb={"3rem"}>
                <StyledInputControl
                  fieldProps={{ name: "name" }}
                  placeHolder={"Taka"}
                />
              </Flex>

              <FormLabel label={"学校"} />
              <Flex gap={3} pb={"3rem"}>
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
                  <Flex direction={"column"} gap={5} alignItems={"center"}>
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

              <FormLabel
                label={"相手に希望するスキル"}
                textProps={{ mt: "4rem" }}
              />
              <FieldArray
                name={"requirementSkills"}
                render={({ remove, push }): JSX.Element => (
                  <Flex direction={"column"} gap={5} alignItems={"center"}>
                    {formikProps.values.requirementSkills.map(
                      (skill, index) => {
                        return (
                          <Flex key={index} gap={5}>
                            <StyledSelectControl
                              fieldProps={{
                                name: `requirementSkills.${index}.name`,
                              }}
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
                      }
                    )}
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

              <FormLabel label={"自己PR"} textProps={{ mt: "3rem" }} />
              <StyledTextArea fieldProps={{ name: "selfPr" }} />

              <VStack my={"3rem"}>
                <StyledSubmitButton text={"保存する"} w={"10rem"} />
              </VStack>
            </Flex>
          );
        }}
      </Formik>
    </Flex>
  );
};
