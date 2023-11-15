export interface Follower {
    id: number;
    followedById: number;
    followedByUsername: string;
    showMessageDialog?: boolean;
    followingStatus: boolean;
}
