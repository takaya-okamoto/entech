import { ProfileType } from "../../../types/profileType";
import { PostsModal } from "./postsModal";
import { FollowersModal } from "./followersModal";
import { FollowingModal } from "./followingModal";
import { EditProfileModal } from "./editProfileModal";
import { Dispatch, SetStateAction } from "react";
import { MyPrDisplay } from "../../profile/myPrDisplay";

type Props = {
  modalType: "posts" | "followers" | "following" | "editProfile" | "selfPr";
  userData: ProfileType | undefined | null;
  onClose: VoidFunction;
  setUpdateProfile: Dispatch<SetStateAction<boolean>>;
};

export const ProfileModals = (props: Props): JSX.Element => {
  return (
    <>
      {props.modalType === "posts" && <PostsModal />}
      {props.modalType === "followers" && (
        <FollowersModal onClose={props.onClose} />
      )}
      {props.modalType === "following" && (
        <FollowingModal onClose={props.onClose} />
      )}
      {props.modalType === "editProfile" && (
        <EditProfileModal
          userData={props.userData}
          setUpdateProfile={props.setUpdateProfile}
          onClose={props.onClose}
        />
      )}
      {props.modalType === "selfPr" && (
        <MyPrDisplay onClose={props.onClose} text={props.userData?.selfPr} />
      )}
    </>
  );
};
