export interface IPostData {
  userId?: number;
  id: number;
  title: string;
  body: string;
  onClick?: () => void;
}

export type Posts = Pick<IPostData, "userId" | "id" | "title" | "body">[];
