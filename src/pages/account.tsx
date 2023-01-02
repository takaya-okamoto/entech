import { Button, Flex, Text, VStack } from "@chakra-ui/react";
import * as Yup from "yup";
import { Formik, FormikProps } from "formik";

import { Layout } from "../components/layout/layout";
import { StyledInputControl } from "../components/form/styledInputControl";
import { FormLabel } from "../components/form/formLabel";
import { StyledSubmitButton } from "../components/form/styledSubmitButton";

const Account = (): JSX.Element => {
  const initialValues = {
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
      grade: Yup.number().required("学年を選択してください"),
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
                <FormLabel label={"氏名"} />
                <Flex gap={3} pb={"1rem"}>
                  <StyledInputControl
                    fieldProps={{ name: "name.first" }}
                    placeHolder={"岡村"}
                  />
                  <StyledInputControl
                    fieldProps={{ name: "name.last" }}
                    placeHolder={"匡也"}
                  />
                </Flex>

                <VStack>
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
export default Account;
