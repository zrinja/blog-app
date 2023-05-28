export interface BlogPosts {
  success: boolean;
  resultData: Post[];
  errorMessage: null;
}

export interface Post {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  text: string;
  categoryId: number;
}
