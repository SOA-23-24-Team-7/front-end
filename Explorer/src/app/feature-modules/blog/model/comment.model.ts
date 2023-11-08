import { User } from "src/app/infrastructure/auth/model/user.model";

export interface Comment {
    id?: number;
    authorId: number;
    blogId: number;
    createdAt: string;
    updatedAt?: string;
    text: string;
    author: User;
}

export interface CreateComment {
    blogId: number;
    text: string;
}
