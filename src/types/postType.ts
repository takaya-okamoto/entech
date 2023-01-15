export type PostType = {
  userId: string;
  postId: string;
  postImage: string;
  title: string;
  describe: string;
  requirementSkills: {
    name: string;
  }[];
};
