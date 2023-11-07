import { Follower } from "src/app/feature-modules/stakeholder/model/follower";

export interface UserWithFollowers {
    id: number;
    username: string;
    role: string;
    followers: Follower[];
}
