export type ProfileType = {
  id: string;
  profileImage: string;
  name: {
    first: string;
    last: string;
  };
  school: {
    name: string;
    faculty: string;
    grade: string;
  };
  userType: string;
  skills: {
    name: string;
  }[];
  selfPr: string;
};
