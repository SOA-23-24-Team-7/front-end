export interface Vote {
    userId: number;
    blogId: number;
    voteType?: VoteType;
}

export enum VoteType {
    DOWNVOTE = 0,
    UPVOTE = 1,
}
