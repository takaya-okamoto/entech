export type ProfileType = {
  id: string;
  profileImage: string;
  name: string;
  school: {
    name: string;
    faculty: string;
    grade: string;
  };
  userType: string;
  requirementSkills: {
    name: string;
  }[];
  skills: {
    name: string;
  }[];
  selfPr: string;
};
