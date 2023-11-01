import { Comment } from "./comment.model";

export interface Blog {
    id: number;
    title: string;
    description: string;
    date: string;
    pictures: string[];
    status: string;
    comments: Comment[];
    voteCount: number;
}
