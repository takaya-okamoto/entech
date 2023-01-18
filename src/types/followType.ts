export type FollowType = {
  uid: string;

  //フォローしている人
  following: {
    uid: string;
  }[];

  //フォローされている人
  followers: {
    uid: string;
  }[];
};
