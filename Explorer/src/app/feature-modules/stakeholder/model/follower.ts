export interface Follower {
    id: number;
    userId: number;
    followedById: number;
    followedByUserName: string;
    showMessageDialog?: boolean;
}
