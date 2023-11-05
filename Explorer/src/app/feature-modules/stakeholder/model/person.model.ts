import { UserWithFollowers } from "./userWithFollowers";

export interface Person {
    id: number;
    userId: number;
    name: string;
    surname: string;
    email: string;
    profilePicture: string;
    bio: string;
    moto: string;
    user: UserWithFollowers;
}
