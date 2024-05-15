import { User } from "src/app/infrastructure/auth/model/user.model";
import { Comment } from "./comment.model";
import { Vote } from "./vote.model";

export interface Blog {
    id: number;
    title: string;
    description: string;
    date: {
        seconds: number,
        nanos: number
    };
    status: number | string;
    comments: Comment[];
    voteCount: number;
    votes: Vote[];
    authorId: number;
    author: User;
    visibilityPolicy: number;
    visibility: string;
    showMore?: boolean;
    blogTopic: string;
}
