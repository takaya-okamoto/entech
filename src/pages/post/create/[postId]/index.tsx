import { Flex, useToast, VStack, Button } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import * as Yup from "yup";
import {
  selectedFooterState,
  timeLineModeState,
} from "../../../../stores/recoil";
import { useEffect } from "react";
import { useFetchFirestore } from "../../../../hooks/logic/useFetchFirestore";
import { useMyAccount } from "../../../../hooks/logic/useMyAccount";
import { FieldArray, Formik, FormikProps } from "formik";
import { StyledImageInput } from "../../../../components/form/styledImageInput";
import { FormLabel } from "../../../../components/form/formLabel";
import { StyledTextArea } from "../../../../components/form/styledTextArea";
import { StyledSubmitButton } from "../../../../components/form/button/styledSubmitButton";
import { StyledSelectControl } from "../../../../components/form/styledSelectControl";
import { DeleteButton } from "../../../../components/form/button/deleteButton";
import { StyledButton } from "../../../../components/form/button/StyledButton";
import { useSkills } from "../../../../hooks/view/useSkills";
import { StyledInputControl } from "../../../../components/form/styledInputControl";
import { UploadImage } from "../../../../lib/clientSide/storage/uploadImage";
import { PostType } from "../../../../types/postType";
import { WritePost } from "../../../../lib/clientSide/firestore/write/writePost";
import { fetchPost } from "../../../../lib/clientSide/firestore/fetch/fetchPost";
import { useRouter } from "next/router";
import { deletePost } from "../../../../lib/clientSide/firestore/delete/deletePost";

const Index = (): JSX.Element => {
  const [selectedFooter, setSelectedFooter] =
    useRecoilState<number>(selectedFooterState);
  const [timeLineMode, setTimeLineMode] =
    useRecoilState<string>(timeLineModeState);
  useEffect(() => {
    setSelectedFooter(3);
    setTimeLineMode("en");
  });

  const router = useRouter();
  const toast = useToast();
  const { user } = useMyAccount();
  const postId = router.query;
  const uid = user?.uid ?? "noUser";
  const fetchId = uid + postId.postId;
  const post = useFetchFirestore(
    fetchPost,
    typeof postId.postId === "string" ? postId.postId : ""
  );
  const skills = useSkills();

  const initialValues = {
    postImage: post.data?.postImage ?? "",
    title: post.data?.title ?? "",
    describe: post.data?.describe ?? "",
    requirementSkills: post.data?.requirementSkills ?? [{ name: "" }],
  };
  const postSchema = Yup.object({
    postImage: Yup.string().required("画像を選択してください。"),
    title: Yup.string().required("事業名を入力してください。"),
    describe: Yup.string().required("説明を入力してください。"),
  });

  const handleSubmit = async (
    submittedValues: typeof initialValues
  ): Promise<void> => {
    if (!user) return;
    const userId = user.uid;
    const path = "postImage/" + userId + "/" + fetchId;
    await UploadImage(path, submittedValues.postImage).then((res) => {
      submittedValues.postImage = res;
    });
    const info: PostType = {
      userId,
      postId: post.data ? post.data.postId : fetchId,
      ...submittedValues,
    };
    try {
      await WritePost(info);
      toast({
        title: "投稿を保存しました。",
        status: "success",
        position: "top",
        isClosable: true,
      });
    } catch (e) {
      console.error(e);
      toast({
        title: "投稿の保存に失敗しました。",
        status: "success",
        position: "top",
        isClosable: true,
      });
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost(typeof postId.postId === "string" ? postId.postId : "");
      toast({
        title: "投稿を削除しました。",
        status: "success",
        position: "top",
        isClosable: true,
      });
    } catch (e) {
      console.error(e);
      toast({
        title: "投稿の削除に失敗しました。",
        status: "success",
        position: "top",
        isClosable: true,
      });
    }
    return;
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
              <StyledTextArea
                fieldProps={{ name: "describe" }}
                textAreaProps={{ minH: "200px" }}
              />

              <FormLabel label={"求めるスキル"} textProps={{ mt: "2rem" }} />
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

              <VStack my={"2rem"}>
                <StyledSubmitButton text={"保存する"} w={"10rem"} />
              </VStack>

              <VStack my={"2rem"}>
                <Button colorScheme={"red"} onClick={handleDelete}>
                  削除する
                </Button>
              </VStack>
            </Flex>
          );
        }}
      </Formik>
    </Flex>
  );
};

export default Index;
