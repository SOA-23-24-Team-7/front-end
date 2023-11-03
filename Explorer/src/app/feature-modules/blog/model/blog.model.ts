import { Comment } from "./comment.model";
import { Vote } from "./vote.model";

export interface Blog {
    id: number;
    title: string;
    description: string;
    date: string;
    pictures: string[];
    status: string;
    comments: Comment[];
    voteCount: number;
    votes: Vote[];
}
