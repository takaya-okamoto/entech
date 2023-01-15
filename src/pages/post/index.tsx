import { Flex, VStack } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import * as Yup from "yup";
import { selectedFooterState, timeLineModeState } from "../../stores/recoil";
import { useEffect } from "react";
import { useFetchFirestore } from "../../hooks/logic/useFetchFirestore";
import { fetchProfile } from "../../lib/clientSide/firestore/fetchProfile";
import { useMyAccount } from "../../hooks/logic/useMyAccount";
import { FieldArray, Formik, FormikProps } from "formik";
import { StyledImageInput } from "../../components/form/styledImageInput";
import { FormLabel } from "../../components/form/formLabel";
import { StyledTextArea } from "../../components/form/styledTextArea";
import { StyledSubmitButton } from "../../components/form/button/styledSubmitButton";
import { StyledSelectControl } from "../../components/form/styledSelectControl";
import { DeleteButton } from "../../components/form/button/deleteButton";
import { StyledButton } from "../../components/form/button/StyledButton";
import { useSkills } from "../../hooks/view/useSkills";
import { StyledInputControl } from "../../components/form/styledInputControl";

const Index = (): JSX.Element => {
  const [selectedFooter, setSelectedFooter] =
    useRecoilState<number>(selectedFooterState);
  const [timeLineMode, setTimeLineMode] =
    useRecoilState<string>(timeLineModeState);
  useEffect(() => {
    setSelectedFooter(2);
    setTimeLineMode("en");
  });

  const { user } = useMyAccount();
  const { data } = useFetchFirestore(fetchProfile, user?.uid);
  const skills = useSkills();

  const initialValues = {
    postImage: "",
    title: "",
    describe: "",
    skills: data?.skills ?? [{ name: "" }],
  };
  const postSchema = Yup.object({
    postImage: Yup.string().required("画像を選択してください。"),
    title: Yup.string().required("事業名を入力してください。"),
    describe: Yup.string().required("説明を入力してください。"),
  });

  const handleSubmit = async (
    submittedValues: typeof initialValues
  ): Promise<void> => {
    console.warn(submittedValues);
  };

  return (
    <Flex justifyContent={"center"} pb={"4rem"}>
      <Formik
        initialValues={initialValues}
        validationSchema={postSchema}
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
              <VStack>
                <StyledImageInput
                  fieldProps={{ name: "postImage" }}
                  isPost={true}
                />
              </VStack>

              <FormLabel label={"事業名"} textProps={{ mt: "2rem" }} />
              <StyledInputControl fieldProps={{ name: "title" }} />

              <FormLabel label={"事業の内容"} textProps={{ mt: "2rem" }} />
              <StyledTextArea fieldProps={{ name: "describe" }} />

              <FormLabel label={"求めるスキル"} textProps={{ mt: "2rem" }} />
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

              <VStack my={"2rem"}>
                <StyledSubmitButton text={"保存する"} w={"10rem"} />
              </VStack>
            </Flex>
          );
        }}
      </Formik>
    </Flex>
  );
};

export default Index;
