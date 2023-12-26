import { User } from "src/app/infrastructure/auth/model/user.model";
import { Person } from "./person.model";

export interface Following {
    id: number;
    following: User;
    followingPerson: Person;
    followingStatus: boolean;
}
