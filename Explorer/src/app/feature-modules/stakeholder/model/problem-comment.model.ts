import { User } from "src/app/infrastructure/auth/model/user.model";

export interface ProblemComment {
    commenterId: number;
    commenter: User;
    text: string;
}
