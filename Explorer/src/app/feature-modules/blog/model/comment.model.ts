export interface Comment {
  id?: number;
  authorId: number;
  blogId: number;
  createdAt: string;
  updatedAt?: string;
  text: string;
}

export interface CreateComment {
  blogId: number;
  text: string;
}

export interface UpdateComment {
  id: number
  text: string;
}