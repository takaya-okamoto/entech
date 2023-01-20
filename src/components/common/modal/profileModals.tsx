import { ProfileType } from "../../../types/profileType";
import { PostsModal } from "./postsModal";
import { FollowersModal } from "./followersModal";
import { FollowingModal } from "./followingModal";
import { EditProfileModal } from "./editProfileModal";

type Props = {
  modalType: "posts" | "followers" | "following" | "editProfile";
  userData: ProfileType | undefined | null;
  onClose: VoidFunction;
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
        <EditProfileModal userData={props.userData} />
      )}
    </>
  );
};
