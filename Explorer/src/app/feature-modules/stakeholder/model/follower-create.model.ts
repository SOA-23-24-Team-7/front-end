export interface FollowerCreate {
    id?: number;
    userId: number;
    followedById: number;
}
