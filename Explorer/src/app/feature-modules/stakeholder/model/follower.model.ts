import { User } from "src/app/infrastructure/auth/model/user.model";
import { Person } from "./person.model";

export interface Follower {
    id: number;
    followedBy: User;
    followedByPerson: Person;
    showMessageDialog?: boolean;
    followingStatus: boolean;
}
